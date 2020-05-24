/*
    spaghetti ahead
*/
import "/utils/polyfills/polyfill-requestAnimationFrame.js";

import store from "/state/store.js";
import { stateChangeWorldObject, stateChangeWorldFile, stateChangeRunning } from "/state/modules/app.js";
import { stateChangePercentage, stateChangeDescription, stateChangeError } from "/state/modules/status.js";
import api from "/utils/api/api.js";
import { map } from "/utils/number.js";
import { resetWorld } from "/app/app.js";

import LAYERS from "/utils/dbs/LAYERS.js";
import colors from "/utils/dbs/colors.js";
import sprite, { NPCsSprites } from "/utils/dbs/sprites.js";

let worldFile, world;
let canvas, ctx;
let worker = new Worker("./web-worker.js");;

worker.onmessage = ({ data }) => {
    try {
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
                    store.dispatch(stateChangeError("See more info in console (please report the error to developer)"));
                }
                api.post("/error", {
                    error: "auto_line_59: " + JSON.stringify(data.error)
                });
                console.error("web worker error:", data.error);
                break;
            case "_DEBUG_RETURN_TILE_INFO":
                console.log(data.tile);
                break;
        }
    } catch(e) {
        console.error("web worker error:", e);
        api.post("/error", {
            error: "auto_line_70: " + JSON.stringify(e)
        });
        return;
    }
}

let unsafe;

let layerImage;
let layerCanvas = {};
let layerCtx = {};
Object.values(LAYERS).forEach(LAYER => {
    layerCanvas[LAYER] = document.createElement("canvas");
    layerCtx[LAYER] = layerCanvas[LAYER].getContext("2d");
});
let layersVisibility;

let running = false;
let editBuffer = [];

let zoomLevel = 0;
let zoomFactors = [];
let viewWidthTiles, viewHeightTiles;
let tilePixelRatio;

let posX;
let posY;

let tool = "move";
let activeLayer, activeSize, activeColor;
const brush = new Image(1,1);
brush.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWPjfBwAENwHuUNRdVAAAAABJRU5ErkJggg==";

let deltaX = 0;
let deltaY = 0;
let prevDragX = null;
let prevDragY = null;

let mouseX, mouseY;

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
    layersVisibility = _layersVisibility;
}

const changeCanvasActiveLayer = (_activeLayer) => {
    activeLayer = _activeLayer;
}

const changeCanvasActiveSize = (_activeSize) => {
    activeSize = _activeSize;
}

const changeCanvasActiveColor = (_activeColor) => {
    activeColor = _activeColor;
}

const changeUnsafe = (_unsafe) => {
    unsafe = _unsafe;
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

    if (Object.entries(data).length === 0 && data.constructor === Object)
        return null;
    return data;
}

const getCanvasMapFile = async (worldObject) => {
    if (!running)
        return null;

    return new Promise((resolve, reject) => {
        worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "RETURN_PERCENTAGE_SAVING":
                    store.dispatch(stateChangePercentage(data.percentage));
                    break;
                case "RETURN_MAP_FILE":
                    store.dispatch(stateChangeDescription("Finished"));
                    resolve(data.newWorldFile);
                    break;
                case "ERROR":
                    if (data.error.name == "TerrariaWorldSaverError") {
                        store.dispatch(stateChangeError(data.error.onlyMessage));
                    } else {
                        store.dispatch(stateChangeError("See more info in console (please report the error to developer)"));
                    }
                    console.error("web worker error:", data.error);
                    api.post("/error", {
                        error: "auto_line_184: " + JSON.stringify(data.error)
                    });
                    store.dispatch(stateChangeDescription("Failed"));
                    resolve(null);
                    break;
            }
        }

        store.dispatch(stateChangeDescription("Generating"));
        worker.postMessage({ action: "SAVE_MAP", worldObject });
    });
}

const verifyMapFile = async (file) => {
    return new Promise((resolve, reject) => {
        worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "RETURN_FILE_VALIDITY":
                    resolve(data.valid);
                    break;
                case "ERROR":
                    reject(data.error);
            }
        }
        worker.postMessage({ action: "VERIFY_FILE", file });
    });
};

function init(_canvas) {
    canvas = _canvas;
    ctx = canvas.getContext("2d");

    canvas.addEventListener("wheel", onCanvasWheel);
    canvas.addEventListener("mouseup", onCanvasMouseUp);
    document.addEventListener("mouseup", onCanvasMouseUp);
    canvas.addEventListener("mousemove", onCanvasMouseMove);
    canvas.addEventListener("click", onCanvasClick);
}

function load() {
    store.dispatch(stateChangeError(null));

    worker.postMessage({
        action: "PARSE_AND_RENDER_MAP_RETURN_WITHOUT_BLOCKS",
        file: worldFile,
        unsafe
    });
}

function onCanvasClick(e) {
    if (window.debug)
        onDebugClick(e);
    else if (tool == "pencil")
        onPencilClick(e);
    else if (tool == "bucket")
        onBucketClick(e);
    else if (tool == "eraser")
        onEraserClick(e);
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

function onCanvasMouseMove(e) {
    [mouseX, mouseY] = getMouseCanvasPosition(e);

    if ((tool == "move" && e.buttons == 1) || e.buttons == 4) {
        canvas.classList.add("grabbed");
        onMoveDrag(e);
    }
    else if (tool == "pencil" && e.buttons == 1)
        onPencilDrag(e);
    else if (tool == "eraser" && e.buttons == 1)
        onEraserDrag(e);
}

function onCanvasMouseUp(e) {
    deltaX = deltaY = 0;
    prevDragX = prevDragY = null;
    canvas.classList.remove("grabbed");
}

function getMouseCanvasPosition(e) {
    const rect = e.target.getBoundingClientRect();
    return [e.clientX - Math.floor(rect.left), e.clientY - Math.floor(rect.top)];
}

function getMouseImagePosition(e) {
    let [x, y] = getMouseCanvasPosition(e);
    return [Math.floor(map(x, 0, canvas.width, posX, posX + viewWidthTiles)), Math.floor(map(y, 0, canvas.height, posY, posY + viewHeightTiles))]
}

function setLayerImagePointColor(LAYER, color, x, y, push = true) {
    const offset = (world.header.maxTilesX * y + x) * 4;
    layerImage[LAYER].data[offset] = color.r;
    layerImage[LAYER].data[offset+1] = color.g;
    layerImage[LAYER].data[offset+2] = color.b;
    layerImage[LAYER].data[offset+3] = color.a;

    if (push)
        pushLayerImage(LAYER);
}

function getLayerImagePointColor(LAYER, x, y) {
    const offset = (world.header.maxTilesX * y + x) * 4;
    return {
        r:layerImage[LAYER].data[offset],
        g:layerImage[LAYER].data[offset+1],
        b:layerImage[LAYER].data[offset+2],
        a:layerImage[LAYER].data[offset+3]
    }
}

function setLayerImageRowColor(LAYER, color, x, y, length, push = true) {
    if (typeof color == "number" || typeof color == "string")
        color = colors[LAYER][color];

    const offset = (world.header.maxTilesX * y + x) * 4;
    length = length  * 4;

    for (let i = 0; i < length; i += 4) {
        layerImage[LAYER].data[offset+i] = color.r;
        layerImage[LAYER].data[offset+i+1] = color.g;
        layerImage[LAYER].data[offset+i+2] = color.b;
        layerImage[LAYER].data[offset+i+3] = color.a;
    }

    if (push)
        pushLayerImage(LAYER);
}

function getLayerImageRowColor(LAYER, x, y, length) {
    const offset = (world.header.maxTilesX * y + x) * 4;
    length *= 4;

    const buffer = [];
    for (let i = 0; i < length; i++)
        buffer.push( layerImage[LAYER].data[offset + i] );

    return buffer;
}

function setLayerImageRectangleColor(LAYER, color, point1, point2, push = true) {
    if (typeof color == "number" || typeof color == "string")
        color = colors[LAYER][color];

    const [x1, y1] = point1;
    const [x2, y2] = point2;

    for (let y = y1; y < y2; y++)
        setLayerImageRowColor(LAYER, color, x1, y, x2 - x1, false);

    if (push)
        pushLayerImage(LAYER);
}

function getLayerImageRectangleColor() {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    const height = y2 - y1;
    const rowLength = (x2 - x1) * 4;

    const buffer = [];

    for (let i = 0; i < height; i++) {
        const offset = (world.header.maxTilesX * (y1 + i) + x1) * 4;
        for (let j = 0; j < rowLength; j++) {
            buffer.push( layerImage[LAYER].data[offset + j] );
        }
    }

    return buffer;
}

function setLayerImagePathColor(LAYER, color, point1, point2, strokeWidth, push = true) {
    if (typeof color == "number" || typeof color == "string")
        color = colors[LAYER][color];

    const [x1, y1] = point1;
    const [x2, y2] = point2;
//    const dir;
    const width = x2 - x1;
    const height = y2 - y1;

    const angleDir = width > height;
    const angleLength = angleLength ? Math.round(width / height) : Math.round(height / width);

    for (let y = y1, x = x1; y < y2; y++, x += angleLength) {
        if (angleDir) {
            for (let i = -strokeWidth / 2; i < strokeWidth / 2; i++)
                setLayerImageRowColor(LAYER, color, x, y + i, angleLength, false);
        }
        else {
            for (let i = -strokeWidth / 2; i < strokeWidth / 2; i++)
                setLayerImageRowColor(LAYER, color, x + i, y, angleLength, false);
        }
    }

    if (push)
        pushLayerImage(LAYER);
}

function setLayerImageFourwayFillColor(LAYER, fillColor, x, y, push = true) {
    if (typeof fillColor == "number" || typeof fillColor == "string")
        fillColor = colors[LAYER][fillColor];

    let pointsBuffer = [[x,y]];
    let pointColor = getLayerImagePointColor(LAYER, x, y);
    const boundaryColor = pointColor;

    if (pointColor.r == fillColor.r && pointColor.g == fillColor.g && pointColor.b == fillColor.b && pointColor.a == fillColor.a)
        return;

    let pointsEdited = [];
    while (pointsBuffer.length !== 0) {
        const [x, y] = pointsBuffer.pop();

        pointColor = getLayerImagePointColor(LAYER, x, y);

        if (pointColor.r == boundaryColor.r && pointColor.g == boundaryColor.g && pointColor.b == boundaryColor.b && pointColor.a == boundaryColor.a) {
            setLayerImagePointColor(LAYER, fillColor, x, y, false);
            pointsEdited.push([x, y]);
            pointsBuffer.push([x-1, y], [x+1, y], [x, y-1], [x, y+1]);
        }
    }

    if (push)
        pushLayerImage(LAYER);

    return pointsEdited;
}

function sendTilesRectangleChange(LAYER, id, point1, point2) {
    worker.postMessage({ action: "SAVE_TILES_RECTANGLE_CHANGE", LAYER, id, point1, point2 });
}

function sendSendTilesArrayChange(LAYER, id, tilesArray) {
    worker.postMessage({ action: "SAVE_TILES_ARRAY_CHANGE", LAYER, id, tilesArray });
}

function onMoveDrag(e) {
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

function onDebugClick(e) {
    const [x, y] = getMouseImagePosition(e);
    console.log(x, y);
    worker.postMessage({ action: "_DEBUG_GET_TILE_INFO", x, y });
}

function onPencilClick(e) {
    const [x, y] = getMouseImagePosition(e);
    const activeSizeHalf = activeSize / 2;
    setLayerImageRectangleColor(activeLayer, activeColor, [x-Math.floor(activeSizeHalf), y-Math.floor(activeSizeHalf)], [x+Math.ceil(activeSizeHalf), y+Math.ceil(activeSizeHalf)]);
    sendTilesRectangleChange(activeLayer, activeColor, [x-Math.floor(activeSizeHalf), y-Math.floor(activeSizeHalf)], [x+Math.ceil(activeSizeHalf), y+Math.ceil(activeSizeHalf)]);
}

function onPencilDrag(e) {
    const [x, y] = getMouseImagePosition(e);

    if (prevDragX == null) {
        prevDragX = x;
        prevDragY = y;
        return;
    }

    const activeSizeHalf = activeSize / 2;
    setLayerImageRectangleColor(activeLayer, activeColor, [x-Math.floor(activeSizeHalf), y-Math.floor(activeSizeHalf)], [x+Math.ceil(activeSizeHalf), y+Math.ceil(activeSizeHalf)]);
    sendTilesRectangleChange(activeLayer, activeColor, [x-Math.floor(activeSizeHalf), y-Math.floor(activeSizeHalf)], [x+Math.ceil(activeSizeHalf), y+Math.ceil(activeSizeHalf)]);
    //setLayerImagePathColor(activeLayer, activeColor, [prevDragX, prevDragY], [x, y], 4);

    prevDragX = x;
    prevDragY = y;
}

function onBucketClick(e) {
    const [x, y] = getMouseImagePosition(e);

    sendSendTilesArrayChange( activeLayer, activeColor, setLayerImageFourwayFillColor(activeLayer, activeColor, x, y) );
}

function onEraserClick(e) {
    const [x, y] = getMouseImagePosition(e);
    const activeSizeHalf = activeSize / 2;
    setLayerImageRectangleColor(activeLayer, {r:0,g:0,b:0,a:0}, [x-Math.floor(activeSizeHalf), y-Math.floor(activeSizeHalf)], [x+Math.ceil(activeSizeHalf), y+Math.ceil(activeSizeHalf)], true);
    sendTilesRectangleChange(activeLayer, null, [x-Math.floor(activeSizeHalf), y-Math.floor(activeSizeHalf)], [x+Math.ceil(activeSizeHalf), y+Math.ceil(activeSizeHalf)]);
}

function onEraserDrag(e) {
    const [x, y] = getMouseImagePosition(e);

    if (prevDragX == null || (x != prevDragX || y != prevDragY)) {
        prevDragX = x;
        prevDragY = y;
        const activeSizeHalf = activeSize / 2;
        setLayerImageRectangleColor(activeLayer, {r:0,g:0,b:0,a:0}, [x-Math.floor(activeSizeHalf), y-Math.floor(activeSizeHalf)], [x+Math.ceil(activeSizeHalf), y+Math.ceil(activeSizeHalf)]);
        sendTilesRectangleChange(activeLayer, null, [x-Math.floor(activeSizeHalf), y-Math.floor(activeSizeHalf)], [x+Math.ceil(activeSizeHalf), y+Math.ceil(activeSizeHalf)]);
    }
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
    zoomLevel = 0;
    zoomFactors = [];
    canvas.height++;
    canvas.height--;
}

let temp0, temp1, temp2;

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

    if (tool == "pencil" || tool == "eraser") {
        temp0 = activeSize * tilePixelRatio;
        ctx.drawImage(brush, 0, 0, 1, 1, mouseX - temp0/2, mouseY - temp0/2, temp0, temp0);
    }

    if (world.NPCs && layersVisibility.NPCs)
        world.NPCs.forEach(npc => {
            try {
                temp0 = NPCsSprites[npc.id][2] * ( 2 + zoomLevel * 0.2 );
                temp1 = NPCsSprites[npc.id][3] * ( 2 + zoomLevel * 0.2 );

                if (npc.homePosition)
                    ctx.drawImage(sprite,
                        NPCsSprites[npc.id][0], NPCsSprites[npc.id][1], NPCsSprites[npc.id][2], NPCsSprites[npc.id][3],
                        npc.homePosition.x * tilePixelRatio - posX * tilePixelRatio - temp0 / 2, npc.homePosition.y * tilePixelRatio - posY * tilePixelRatio - temp1, temp0, temp1);
                else
                    ctx.drawImage(sprite,
                        NPCsSprites[npc.id][0], NPCsSprites[npc.id][1], NPCsSprites[npc.id][2], NPCsSprites[npc.id][3],
                        (npc.position.x / 16) * tilePixelRatio - posX * tilePixelRatio - temp0 / 2, (npc.position.y / 16) * tilePixelRatio - posY * tilePixelRatio - temp1, temp0, temp1);
                }
            catch(e) {
            }
        });

    if (running)
        requestAnimationFrame(tick, canvas);
}

export default init;
export {
    changeCanvasWorldFile,
    changeCanvasTool,
    changeCanvasLayersVisibility,
    changeCanvasActiveLayer,
    changeCanvasActiveSize,
    changeCanvasActiveColor,
    changeUnsafe,
    getCanvasMapData,
    getCanvasMapFile,
    verifyMapFile,

    setLayerImageRectangleColor
};