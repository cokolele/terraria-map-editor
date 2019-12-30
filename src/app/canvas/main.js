import "/utils/polyfills/polyfill-requestAnimationFrame.js";

import store from "/state/store.js";
import { changeWorldObject, changeWorldFile } from "/state/modules/app.js";
import { changePercentage, changeDescription, changeError } from "/state/modules/status.js";

let worldFile, world;
let canvas, ctx;
let image, imageUrl = new Image();

let running = false;

let isDragging = false;
let deltaX = 0;
let deltaY = 0;
let prevDragX = null;
let prevDragY = null;

let zoomLevel = 0;
let zoomFactors = [];
let viewWidthScale, viewHeightScale;
let tilePixelRatio;

let posX;
let posY;

const changeCanvasWorldFile = (_worldFile) => {
    worldFile = _worldFile;

    if (worldFile === null)
        stop();
    else
        load();
}

function init(_canvas) {
    canvas = _canvas;
    ctx = canvas.getContext("2d");

    canvas.addEventListener("wheel", onCanvasWheel);
    canvas.addEventListener("mouseup", onCanvasMouseUp);
    document.addEventListener("mouseup", onCanvasMouseUp);
    canvas.addEventListener("mousedown", onCanvasMouseDown);
    canvas.addEventListener("mousemove", onCanvasMouseMove);
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
    const [x, y] = getMouseCanvasPosition(e);

    console.log(posX, posY);
}

function onCanvasWheel(e) {
    e.preventDefault();

    if (e.deltaY < 0 && zoomLevel < zoomFactors.length - 1)
        viewHeightScale = zoomFactors[++zoomLevel];
    else if (e.deltaY > 0 && zoomLevel > 0)
        viewHeightScale = zoomFactors[--zoomLevel];

    tilePixelRatio = canvas.clientHeight / viewHeightScale;
}

function onCanvasMouseDown(e) {
    if (e.buttons == 1 || e.buttons == 4) {
        isDragging = true;
        canvas.classList.add("grabbed");
    }

    if (e.buttons == 1) {
        getMouseImagePosition(e);
    }
}

function onCanvasMouseUp(e) {
    isDragging = false;
    deltaX = deltaY = 0;
    prevDragX = prevDragY = null;
    canvas.classList.remove("grabbed");
}

function onCanvasMouseMove(e) {
    if (!isDragging)
        return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - Math.floor(rect.top);

    if (prevDragX == null) {
        prevDragX = x;
        prevDragY = y;
        return;
    }

    deltaX = x - prevDragX;
    deltaY = y - prevDragY;

    prevDragX = x;
    prevDragY = y;

    posX -= deltaX * tilePixelRatio;
    posY -= deltaY * tilePixelRatio;

    if (posX < 0)
        posX = 0;

    if (posY < 0)
        posY = 0;
}

function updateImageUrl() {
    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");
    offscreenCanvas.width = world.header.maxTilesX;
    offscreenCanvas.height = world.header.maxTilesY;
    offscreenCtx.putImageData(image, 0, 0);
    imageUrl.src = offscreenCanvas.toDataURL();
}

function start() {
    updateImageUrl();
    store.dispatch(changeDescription("Finished"));
    running = true;
    tick(0);
}

function refreshCanvas() {
    canvas.width = 0;
    canvas.height = 0;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    tilePixelRatio = canvas.clientHeight / viewHeightScale;
    viewWidthScale = canvas.width / tilePixelRatio;

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
    viewHeightScale = zoomFactors[zoomLevel];

    refreshCanvas();
}

function stop() {
    running = false;
    canvas.height++;
    canvas.height--;
}

const tick = (T) => {
    if (T == 0)
        preRender();

    refreshCanvas();
    //correctPositions();

    ctx.drawImage(imageUrl,
        posX, posY,
        viewWidthScale, viewHeightScale,
        0, 0,
        canvas.width, canvas.height);

    if (running)
        requestAnimationFrame(tick, canvas);
}

export default init;
export {
    changeCanvasWorldFile
};