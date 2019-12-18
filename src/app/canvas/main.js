import "./polyfill-requestAnimationFrame.js";

import store from "/state/store.js";
import { changeWorldFile } from "/state/modules/menu.js";
import { changePercentage, changeDescription, changeError } from "/state/modules/status.js";

const _DEBUG_SAVE = false;

let worldFile, world;
let canvas, ctx;
let image, imageSize;

let running = false;

let isDragging = false;
let deltaX = 0;
let deltaY = 0;
let prevDragX = null;
let prevDragY = null;

let zoomScale = 0;

let posX;
let posY;

let prevFile;
store.subscribe(() => {
    const file = store.getState().menu.file;

    if (file === null && running) {
        prevFile = null;
        worldFile = null;
        running = false;
        stop();
    }
    else if (file instanceof File) {
        if (prevFile == undefined || (prevFile.name !== file.name && prevFile.size !== file.size && prevFile.lastModified !== file.lastModified)) {
            prevFile = file;
            worldFile = file;
            load();
        }
    }
});

const refreshCanvasSize = () => {
    canvas.width = 0;
    canvas.height = 0;
    canvas.width = Math.floor(canvas.clientWidth);
    canvas.height = Math.floor(canvas.clientHeight);
}

const init = (canvasEl) => {
    canvas = canvasEl;
    ctx = canvas.getContext("2d");

    refreshCanvasSize();
    window.addEventListener("resize", () => {
        canvas.width = "auto";
        canvas.height = "auto";

        refreshCanvasSize();
    });

    canvas.addEventListener("wheel", onCanvasWheel);
    canvas.addEventListener("mouseup", onCanvasMouseUp);
    document.addEventListener("mouseup", onCanvasMouseUp);
    canvas.addEventListener("mousedown", onCanvasMouseDown);
    canvas.addEventListener("mousemove", onCanvasMouseMove);

    if (_DEBUG_SAVE && localStorage.getItem("_DEBUG_SAVE_IMAGE") !== null) {
        image = new Image();
        image.src = JSON.parse(localStorage.getItem("_DEBUG_SAVE_IMAGE"));

        world = {};
        world.header = JSON.parse(localStorage.getItem("_DEBUG_SAVE_HEADER"));

        posX = world.header.maxTilesX / 2 - canvas.clientWidth / 2;
        posY = 500;

        running = true;
        tick(0);
    }
}

const load = async () => {
    store.dispatch(changeError(null));

    try {
        await new Promise((resolve, reject) => {
            const worker = new Worker("./web-worker-map-parsing.js");

            const errorFn = ({ message }) => {
                console.error(message);
                reject(message);
            }

            worker.onerror = errorFn;
            worker.onmessageerror = errorFn;
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
                        imageSize = data.imageSize;
                        break;
                    case "RETURN_PARSED_MAP":
                        world = data.world;
                        store.dispatch(changeDescription("Re-rendering"));
                        start();
                        resolve();
                        break;

                    case "ERROR":
                        store.dispatch(changeDescription("Failed"));
                        store.dispatch(changePercentage(0));
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
        });
    }
    catch(e) {
        console.error(e);
        return;
    }
}

let leftover = null;
const onCanvasWheel = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - Math.floor(rect.top);

    const zoomFactor = Math.floor((canvas.clientWidth - zoomScale) / 6);

    if (e.deltaY < 0) {
        if (canvas.clientWidth - zoomScale > 32) {
            zoomScale += zoomFactor;
            posX += zoomFactor / 2;
            posY += zoomFactor / 4;
        } else {

        }
    } else if (e.deltaY > 0) {
        if (canvas.clientWidth - zoomScale < world.header.maxTilesX) {
            zoomScale -= zoomFactor;
            posX -= zoomFactor / 2;
            posY -= zoomFactor / 4;
        } else {
            leftover = world.header.maxTilesY - (canvas.clientWidth - zoomScale);
            console.log(leftover);
        }
    }

    if (posX < 0)
        posX = 0;

    if (posY < 0)
        posY = 0;
}

const onCanvasMouseDown = e => {
    if (e.buttons == 1 || e.buttons == 4) {
        isDragging = true;
        canvas.classList.add("grabbed");
    }
}

const onCanvasMouseUp = e => {
    isDragging = false;
    deltaX = deltaY = 0;
    prevDragX = prevDragY = null;
    canvas.classList.remove("grabbed");
}

const onCanvasMouseMove = e => {
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

    // dragDelta * one real pixel to one map pixel ratio
    posX -= deltaX * ( Math.round((canvas.clientWidth - zoomScale) / canvas.clientWidth * 100) / 100 );
    posY -= deltaY * ( Math.round((canvas.clientWidth - zoomScale) / canvas.clientWidth * 100) / 100 );

    if (posX < 0)
        posX = 0;

    if (posY < 0)
        posY = 0;
}

const start = () => {
    console.log(world);

    const offscreen = {};
    offscreen.canvas = document.createElement("canvas");
    offscreen.ctx = offscreen.canvas.getContext("2d");
    offscreen.canvas.width = world.header.maxTilesX;
    offscreen.canvas.height = world.header.maxTilesY;
    offscreen.ctx.putImageData(image, 0, 0);
    image = new Image();
    image.src = offscreen.canvas.toDataURL();

    delete offscreen.canvas;
    delete offscreen.ctx;

    if (_DEBUG_SAVE && localStorage.getItem("_DEBUG_SAVE_IMAGE") === null) {
        localStorage.setItem("_DEBUG_SAVE_IMAGE", JSON.stringify(image.src));
        localStorage.setItem("_DEBUG_SAVE_HEADER", JSON.stringify(world.header));
    }

    posX = world.header.maxTilesX / 2 - canvas.clientWidth / 2;
    posY = 500;

    store.dispatch(changeDescription("Finished"));
    running = true;
    tick(0);
}

const stop = () => {
    canvas.height++;
    canvas.height--;
}

let dimension;
const tick = (T) => {
    canvas.height++;
    canvas.height--;

    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    dimension = canvas.clientWidth > canvas.clientHeight ? canvas.clientWidth : canvas.clientHeight;
    ctx.drawImage(image,
        posX, posY,
        dimension - zoomScale, dimension - zoomScale,
        0, 0,
        dimension, dimension);

    if (running)
        requestAnimationFrame(tick, canvas);
}

export {
    refreshCanvasSize
};

export default init;
