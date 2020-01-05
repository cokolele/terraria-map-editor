import "/utils/polyfills/polyfill-requestAnimationFrame.js";

import tileColors from "/utils/dbs/tile-colors.json";

import store from "/state/store.js";
import { changeWorldObject, changeWorldFile, changeRunning } from "/state/modules/app.js";
import { changePercentage, changeDescription, changeError } from "/state/modules/status.js";
import { map } from "/utils/number.js";

let worldFile, world;
let canvas, ctx;
let image;
let offscreenCanvas = document.createElement("canvas");
let offscreenCtx = offscreenCanvas.getContext("2d");

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

const getCanvasMapData = ({ name, imageUrlPng }) => {
    let data = {};

    if (name && running)
        data.name = worldFile.name;

    if (imageUrlPng && running) {
        data.imageUrlPng = offscreenCanvas.toDataURL("image/png;base64");
    }

    if (Object.entries(data).length === 0 && data.constructor === Object) //empty object
        return null;
    return data;
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
    store.dispatch(changeError(null));

    try {
        const worker = new Worker("./web-worker.js");

        worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "RETURN_PERCENTAGE_PARSING_INCOMING":
                    store.dispatch(changeDescription("Parsing"));
                    break;
                case "RETURN_PERCENTAGE_PARSING":
                    store.dispatch(changePercentage(data.percentage));
                    break;
                case "RETURN_PERCENTAGE_RENDERING_INCOMING":
                    store.dispatch(changeDescription("Rendering"));
                    break;
                case "RETURN_PERCENTAGE_RENDERING":
                    store.dispatch(changePercentage(data.percentage));
                    break;
                case "RETURN_IMAGE_INCOMING":
                    store.dispatch(changeDescription("Copying"));
                    break;
                case "RETURN_IMAGE":
                    image = data.image;
                    break;
                case "RETURN_PARSED_MAP":
                    world = data.world;
                    store.dispatch(changeDescription("Re-rendering"));
                    store.dispatch(changeWorldObject(world));
                    start();
                    break;
                case "ERROR":
                    store.dispatch(changeDescription("Failed"));
                    store.dispatch(changePercentage(null));
                    store.dispatch(changeWorldFile(null));

                    if (data.error.name == "TerrariaWorldParserError") {
                        store.dispatch(changeError(data.error.message));
                    } else {
                        store.dispatch(changeError("see more info in console (please report the error to developer)"));
                        console.log("web worker error:", data.error);
                    }
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

function getMouseCanvasPosition(e) {
    const rect = e.target.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - Math.floor(rect.top)];
}

function getMouseImagePosition(e) {
    let [x, y] = getMouseCanvasPosition(e);
    return [Math.floor(map(x, 0, canvas.width, posX, posX + viewWidthTiles)), Math.floor(map(y, 0, canvas.height, posY, posY + viewHeightTiles))]
}

function onCanvasClick(e) {
    if (tool == "pencil")
        onPencilClick(e);
}

function onCanvasWheel(e) {
    e.preventDefault();

    if (e.deltaY < 0 && zoomLevel < zoomFactors.length - 1)
        viewHeightTiles = zoomFactors[++zoomLevel];
    else if (e.deltaY > 0 && zoomLevel > 0)
        viewHeightTiles = zoomFactors[--zoomLevel];

    tilePixelRatio = canvas.clientHeight / viewHeightTiles;
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
        const color = tileColors.tiles[0];
        const offset = (world.header.maxTilesX * y + x) * 4;
        image.data[offset] = color.r;
        image.data[offset+1] = color.g;
        image.data[offset+2] = color.b;
        image.data[offset+3] = 255;
        updateImage();
    }
}

function onPencilClick(e) {
    const [x, y] = getMouseImagePosition(e);

    const color = tileColors.tiles[0];
    const offset = (world.header.maxTilesX * y + x) * 4;
    image.data[offset] = color.r;
    image.data[offset+1] = color.g;
    image.data[offset+2] = color.b;
    image.data[offset+3] = 255;
    updateImage();
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

function updateImage() {
    offscreenCtx.putImageData(image, 0, 0);
}

function start() {
    offscreenCanvas.width = world.header.maxTilesX;
    offscreenCanvas.height = world.header.maxTilesY;
    updateImage();
    store.dispatch(changeDescription("Finished"));
    running = true;
    store.dispatch(changeRunning(true));
    tick(0);
}

function refreshCanvas() {
    canvas.width = 0;
    canvas.height = 0;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    tilePixelRatio = canvas.clientHeight / viewHeightTiles;
    viewWidthTiles = canvas.width / tilePixelRatio;

    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
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
    store.dispatch(changeRunning(false));
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
    correctPositions();

    ctx.drawImage(offscreenCanvas,
        posX, posY,
        viewWidthTiles, viewHeightTiles,
        0, 0,
        canvas.width, canvas.height);

    if (running)
        requestAnimationFrame(tick, canvas);
}

export default init;
export {
    changeCanvasWorldFile,
    changeCanvasTool,
    getCanvasMapData,
};