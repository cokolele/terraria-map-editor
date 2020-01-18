/*
    spaghetti ahead
*/

import "/utils/polyfills/polyfill-requestAnimationFrame.js";

import pointColors from "./pointColors.js";
import LAYERS from "./enum-LAYERS.js";

import store from "/state/store.js";
import { stateChangeWorldObject, stateChangeWorldFile, stateChangeRunning } from "/state/modules/app.js";
import { stateChangePercentage, stateChangeDescription, stateChangeError } from "/state/modules/status.js";
import { map } from "/utils/number.js";

let worldFile, world;
let canvas, ctx;
let worker;

let layerImage;
let layerCanvas = {};
let layerCtx = {};
Object.values(LAYERS).forEach(LAYER => {
    layerCanvas[LAYER] = document.createElement("canvas");
    layerCtx[LAYER] = layerCanvas[LAYER].getContext("2d");
});
let layersVisibility;

let running = false;

let isDragging = false;
let deltaX = 0;
let deltaY = 0;
let prevDragX = null;
let prevDragY = null;

let zoomLevel = 0;
let zoomFactors = [];
let viewWidthTiles, viewHeightTiles;
let tilePixelRatio;

let posX;
let posY;

let tool = "move";
let isPencilDrawing = false;

const changeCanvasWorldFile = (_worldFile) => {
    worldFile = _worldFile;

    if (worldFile === null)
        stop();
    else
        load();
}

const changeCanvasTool = (_tool) => {
    tool = _tool;
}

const changeCanvasLayersVisibility = (_layersVisibility) => {
    layersVisibility = _layersVisibility
}

const getCanvasMapData = ({ name, imageUrlPng }) => {
    let data = {};

    if (name && running)
        data.name = worldFile.name;

    if (imageUrlPng && running) {
        const _tmpCanvas = document.createElement("canvas");
        const _tmpCtx = _tmpCanvas.getContext("2d");

        _tmpCanvas.width = world.header.maxTilesX;
        _tmpCanvas.height = world.header.maxTilesY;

        Object.values(LAYERS).forEach(LAYER => {
            _tmpCtx.drawImage(layerCanvas[LAYER], 0, 0);
        });

        data.imageUrlPng = _tmpCanvas.toDataURL("image/png;base64");
    }

    if (Object.entries(data).length === 0 && data.constructor === Object) //empty object
        return null;
    return data;
}

const getCanvasMapFile = async () => {
    if (!running)
        return null;

    return new Promise((resolve, reject) => {
        worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "RETURN_MAP_FILE":
                    resolve(data.newWorldFile);
                    break;
                case "ERROR":
                    if (data.error.name == "TerrariaWorldSaverError") {
                        store.dispatch(stateChangeError(data.error.onlyMessage));
                    } else {
                        store.dispatch(stateChangeError("see more info in console (please report the error to developer)"));
                    }
                    console.error("web worker error:", data.error);
                    resolve(null);
                    break;
            }
        }

        worker.postMessage({ action: "SAVE_MAP" });
    });
}

function init(_canvas) {
    canvas = _canvas;
    ctx = canvas.getContext("2d");

    canvas.addEventListener("wheel", onCanvasWheel);
    canvas.addEventListener("mouseup", onCanvasMouseUp);
    document.addEventListener("mouseup", onCanvasMouseUp);
    canvas.addEventListener("mousedown", onCanvasMouseDown);
    canvas.addEventListener("mousemove", onCanvasMouseMove);
    canvas.addEventListener("click", onCanvasClick);
}

function load() {
    store.dispatch(stateChangeError(null));

    try {
        worker = new Worker("./webWorker.js");

        worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "RETURN_PERCENTAGE_PARSING_INCOMING":
                    store.dispatch(stateChangeDescription("Parsing"));
                    break;
                case "RETURN_PERCENTAGE_PARSING":
                    store.dispatch(stateChangePercentage(data.percentage));
                    break;
                case "RETURN_PERCENTAGE_RENDERING_INCOMING":
                    store.dispatch(stateChangeDescription("Rendering"));
                    break;
                case "RETURN_PERCENTAGE_RENDERING":
                    store.dispatch(stateChangePercentage(data.percentage));
                    break;
                case "RETURN_IMAGES_INCOMING":
                    store.dispatch(stateChangeDescription("Copying"));
                    break;
                case "RETURN_IMAGES":
                    layerImage = data.layerImage;
                    break;
                case "RETURN_WORLD_OBJECT":
                    world = data.world;
                    store.dispatch(stateChangeDescription("Re-rendering"));
                    store.dispatch(stateChangeWorldObject(world));
                    start();
                    break;
                case "ERROR":
                    store.dispatch(stateChangeDescription("Failed"));
                    store.dispatch(stateChangePercentage(null));
                    store.dispatch(stateChangeWorldFile(null));

                    if (data.error.name == "TerrariaWorldParserError") {
                        store.dispatch(stateChangeError(data.error.onlyMessage));
                    } else {
                        store.dispatch(stateChangeError("see more info in console (please report the error to developer)"));
                    }
                    console.error("web worker error:", data.error);
                    break;
            }
        }

        worker.postMessage({
            action: "PARSE_AND_RENDER_MAP_RETURN_WITHOUT_BLOCKS",
            file: worldFile
        });
    }
    catch(e) {
        console.error(e);
        return;
    }
}

function onCanvasClick(e) {
    if (tool == "pencil")
        onPencilClick(e);
    else if (tool == "bucket")
        onBucketClick(e);
}

function onCanvasWheel(e) {
    e.preventDefault();
    const [prevViewHeightTiles, prevViewWidthTiles] = [viewHeightTiles, viewWidthTiles];
    let [xCanvas, yCanvas] = getMouseCanvasPosition(e);
    const xNormalized = xCanvas / canvas.width;
    const yNormalized = yCanvas / canvas.height;

    if (e.deltaY < 0 && zoomLevel < zoomFactors.length - 1)
        viewHeightTiles = zoomFactors[++zoomLevel];
    else if (e.deltaY > 0 && zoomLevel > 0)
        viewHeightTiles = zoomFactors[--zoomLevel];

    updateViewWidthTiles();

    if (viewHeightTiles == prevViewHeightTiles)
        return;

    posX += prevViewWidthTiles * xNormalized - viewWidthTiles * xNormalized;
    posY += prevViewHeightTiles * yNormalized - viewHeightTiles * yNormalized;
}

function onCanvasMouseDown(e) {
    if ((e.buttons == 1 && tool == "move") || e.buttons == 4) {
        isDragging = true;
        canvas.classList.add("grabbed");
    }
    else if (e.buttons == 1 && tool == "pencil") {
        isPencilDrawing = true;
    }
}

function onCanvasMouseUp(e) {
    isDragging = false;
    isPencilDrawing = false;
    deltaX = deltaY = 0;
    prevDragX = prevDragY = null;
    canvas.classList.remove("grabbed");
}

function onCanvasMouseMove(e) {
    if (isDragging)
        onDrag(e);
    else if (isPencilDrawing)
        onPencilDrag(e);
}

function getMouseCanvasPosition(e) {
    const rect = e.target.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - Math.floor(rect.top)];
}

function getMouseImagePosition(e) {
    let [x, y] = getMouseCanvasPosition(e);
    return [Math.floor(map(x, 0, canvas.width, posX, posX + viewWidthTiles)), Math.floor(map(y, 0, canvas.height, posY, posY + viewHeightTiles))]
}

function getPointColor(LAYER, id) {
    return pointColors[LAYER][id];
}

function setLayerImagePointColor(LAYER, color, x, y, push = true) {
    if (typeof color == "number")
        color = getPointColor(LAYER, color);

    const offset = (world.header.maxTilesX * y + x) * 4;
    layerImage[LAYER].data[offset] = color.r;
    layerImage[LAYER].data[offset+1] = color.g;
    layerImage[LAYER].data[offset+2] = color.b;
    layerImage[LAYER].data[offset+3] = 255;

    if (push)
        pushLayerImage(LAYER);
}

function setLayerImageRectangleColor(LAYER, color, point1, point2, push = true) {
    if (typeof color == "number")
        color = getPointColor(LAYER, color);

    const [x1, y1] = point1;
    const [x2, y2] = point2;

    for (let y = y1; y < y2; y++)
        for (let x = x1; x < x2; x++)
            setLayerImagePointColor(LAYER, color, x, y, false);

    if (push)
        pushLayerImage(LAYER);
}

function setLayerImageFourwayFillColor(LAYER, fillColor, x, y) {
    let pointsBuffer = [[x,y]];
    let offset = (world.header.maxTilesX * y + x) * 4;
    let pointColor = {
        r: layerImage[LAYER].data[offset],
        g: layerImage[LAYER].data[offset+1],
        b: layerImage[LAYER].data[offset+2],
    };
    const boundaryColor = pointColor;

    if (typeof fillColor == "number")
        fillColor = getPointColor(LAYER, fillColor);

    if (pointColor.r == fillColor.r && pointColor.g == fillColor.g && pointColor.b == fillColor.b)
        return;

    while(pointsBuffer.length !== 0) {
        const [x, y] = pointsBuffer.pop();

        offset = (world.header.maxTilesX * y + x) * 4;
        pointColor = {
            r: layerImage[LAYER].data[offset],
            g: layerImage[LAYER].data[offset+1],
            b: layerImage[LAYER].data[offset+2],
        };

        if (pointColor.r == boundaryColor.r && pointColor.g == boundaryColor.g && pointColor.b == boundaryColor.b) {
            setLayerImagePointColor(LAYER, fillColor, x, y, false);
            pointsBuffer.push([x-1, y], [x+1, y], [x, y-1], [x, y+1]);
        }
    }
}

function onDrag(e) {
    const [x, y] = getMouseCanvasPosition(e);

    if (prevDragX == null) {
        prevDragX = x;
        prevDragY = y;
        return;
    }

    deltaX = x - prevDragX;
    deltaY = y - prevDragY;

    prevDragX = x;
    prevDragY = y;

    posX -= deltaX / tilePixelRatio;
    posY -= deltaY / tilePixelRatio;
}

function onPencilDrag(e) {
    const [x, y] = getMouseImagePosition(e);

    if (prevDragX == null || (x != prevDragX || y != prevDragY)) {
        prevDragX = x;
        prevDragY = y;
        setLayerImageRectangleColor(LAYERS.TILES, 0, [x-2, y-2], [x+2, y+2], false);
    }

    pushLayerImage(LAYERS.TILES);
}

function onPencilClick(e) {
    const [x, y] = getMouseImagePosition(e);
    setLayerImageRectangleColor(LAYERS.TILES, 0, [x-2, y-2], [x+2, y+2]);
}

function onBucketClick(e) {
    const [x, y] = getMouseImagePosition(e);

    setLayerImageFourwayFillColor(LAYERS.TILES, 0, x, y);
    pushLayerImage(LAYERS.TILES);
}

function correctPositions() {
    if (posX < 0)
        posX = 0;

    if (posY < 0)
        posY = 0;

    if (posY + viewHeightTiles > world.header.maxTilesY && posY > 0)
        if (world.header.maxTilesY - viewHeightTiles < 0)
            posY = 0;
        else
            posY = world.header.maxTilesY - viewHeightTiles;

    if (posX + viewWidthTiles > world.header.maxTilesX && posX > 0)
        if (world.header.maxTilesX - viewWidthTiles < 0)
            posX = 0;
        else
            posX = world.header.maxTilesX - viewWidthTiles;
}

function pushLayerImage(LAYER) {
    if (LAYER)
        layerCtx[LAYER].putImageData(layerImage[LAYER], 0, 0);
    else
        Object.values(LAYERS).forEach(LAYER => {
            layerCtx[LAYER].putImageData(layerImage[LAYER], 0, 0);
        });
}

function updateViewWidthTiles() {
    tilePixelRatio = canvas.clientHeight / viewHeightTiles;
    viewWidthTiles = canvas.width / tilePixelRatio;
}

function refreshCanvas() {
    canvas.width = 0;
    canvas.height = 0;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
}

function start() {
    Object.values(LAYERS).forEach(LAYER => {
        layerCanvas[LAYER].width = world.header.maxTilesX;
        layerCanvas[LAYER].height = world.header.maxTilesY;
    });
    pushLayerImage();
    store.dispatch(stateChangeDescription("Finished"));
    running = true;
    store.dispatch(stateChangeRunning(true));
    tick(0);

    console.log(world);
}

function preRender() {
    posX = 0;
    posY = 0;

    for (let i = world.header.maxTilesY; i > 10; i = Math.ceil(i * (3.5/5)))
        zoomFactors.push(i);
    zoomFactors.push(10);
    viewHeightTiles = zoomFactors[zoomLevel];

    refreshCanvas();
}

function stop() {
    running = false;
    store.dispatch(stateChangeRunning(false));
    zoomLevel = 0;
    zoomFactors = [];
    canvas.height++;
    canvas.height--;
}

const tick = (T) => {
    if (T == 0) {
        preRender();
    }

    refreshCanvas();
    updateViewWidthTiles();
    correctPositions();

    Object.values(LAYERS).forEach(LAYER => {
        if (layersVisibility[LAYER])
            ctx.drawImage(layerCanvas[LAYER],
                posX, posY,
                viewWidthTiles, viewHeightTiles,
                0, 0,
                canvas.width, canvas.height);
    });

    if (running)
        requestAnimationFrame(tick, canvas);
}

export default init;
export {
    changeCanvasWorldFile,
    changeCanvasTool,
    changeCanvasLayersVisibility,
    getCanvasMapData,
    getCanvasMapFile
};