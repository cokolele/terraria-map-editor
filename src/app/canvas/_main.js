import "./polyfill-requestAnimationFrame.js";
//import "./polyfill-imageData.js";

import store from "/state/store.js";
import { changePercentage, changeDescription } from "/state/modules/status.js";

let worldFile;
let world;
let canvasEl, ctx;
let running = false;
let image, renderImage;

let previousValue;
store.subscribe(() => {
    const value = store.getState().menu.file;

    if (value === null) {
        previousValue = null;
        worldFile = null;
        running = false;
    }
    else if (value instanceof File) {
        if (previousValue == undefined || (previousValue.name !== value.name && previousValue.size !== value.size && previousValue.lastModified !== value.lastModified)) {
            previousValue = value;
            worldFile = value;
            start();
        }
    }
});

const init = (_canvasEl) => {
    canvasEl = _canvasEl;
    ctx = canvasEl.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    canvasEl.width = canvasEl.clientWidth;
    canvasEl.height = canvasEl.clientHeight;
    /*window.addEventListener("resize", () => {
        zoom(0);
    });*/

    canvasEl.addEventListener("wheel", onCanvasWheel);
}

const start = async () => {
    try {
        await new Promise((resolve, reject) => {
            const worker = new Worker("./web-worker-map-parsing.js");

            worker.onerror = ({ message }) => {
                console.error(message);
                reject(message);
            }

            worker.onmessageerror = ({ message }) => {
                console.error(message);
                reject(message);
            }

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
                        store.dispatch(changeDescription("Copying 1/2"));
                        break;
                    case "RETURN_IMAGE":
                        image = data.image;
                        break;
                    case "RETURN_PARSED_MAP_INCOMING":
                        store.dispatch(changeDescription("Copying 2/2"));
                        break;
                    case "RETURN_PARSED_MAP":
                        world = data.world;
                        store.dispatch(changeDescription("Finished"));
                        running = true;
                        tick(0);
                        resolve();
                        break;
                }
            }

            worker.postMessage({
                action: "PARSE_AND_RENDER_MAP",
                file: worldFile
            });
        });
    }
    catch(e) {
        console.error(e);
        return;
    }
}

const onCanvasWheel = e => {
    if (e.deltaY > 0) {
        zoom(1);
    } else {
        zoom(-1)
    }
}

const calculateRatioWidth = height => height * (world.header.maxTilesX / world.header.maxTilesY);
const calculateRatioHeight = width => width * (world.header.maxTilesY / world.header.maxTilesX);

const zoom = direction => {
    const zoomFactor = world.header.maxTilesX / 10;

    if (direction == 1) {
        console.log("zooming");
        zoomLevel++;
    } else if (direction == -1) {
        console.log("unzooming");
        zoomLevel--;
    }

}

let prevZoomLevel, zoomLevel = 1;
let posX, posY;
let width, height;

function concatTypedArrays(array, length) {
    const lengthSum = length * array.length;
    let concatArray = new Uint8ClampedArray(lengthSum);

    for (let i = 0; i < array.length; i++) {
        concatArray.set(array[i], i * length);
    }

    return concatArray;
}

const tick = async (T) => {

    if (prevZoomLevel != zoomLevel) {
        if (zoomLevel == 0)
            zoomLevel = prevZoomLevel == 1 ? -1 : 1;

        const widthZoomFactor = 100;
        const heightZoomFactor = widthZoomFactor * ( world.header.maxTilesY / world.header.maxTilesX );

        if (prevZoomLevel == undefined) {
            posX = world.header.maxTilesX / 2 - canvasEl.width / 2;
            posY = 0;
        }

        width = canvasEl.width + zoomLevel * widthZoomFactor;
        height = canvasEl.height + zoomLevel * heightZoomFactor;

        renderImage = ctx.createImageData(width, height);

console.log("rendering");
        const start = posX * 4;
        const end = start + renderImage.width * 4;
        let cutDataArray = [];

        for (let i = 0; i < renderImage.height; i++) {
            const slice = image.data.slice( i * world.header.maxTilesY * 4 + start, i * world.header.maxTilesY * 4 + end);
            cutDataArray.push(slice);
        }

        console.log(cutDataArray);
        const cutData = concatTypedArrays(cutDataArray, renderImage.width * 4);

        renderImage.data.set(cutData);

        prevZoomLevel = zoomLevel;
    }

    ctx.putImageData( renderImage, 0, 0 );

    if (running)
        requestAnimationFrame(tick, canvasEl);
}

export default init;