import "./polyfill-requestAnimationFrame.js";

import store from "/state/store.js";
import { changePercentage, changeDescription } from "/state/modules/status.js";

let worldFile;
let world;
let canvasEl, ctx;
let running = false;
let image, renderImage;
let width, height;
let prevWidth, prevHeight;

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

    prevWidth = width = canvasEl.width = canvasEl.clientWidth;
    prevHeight = height = canvasEl.height = canvasEl.clientHeight;

    window.addEventListener("resize", () => {
        width = canvasEl.width = canvasEl.clientWidth;
        height = canvasEl.height = canvasEl.clientHeight;
    });

    canvasEl.addEventListener("wheel", onCanvasWheel);
}

const start = async () => {
    try {
        await new Promise((resolve, reject) => {
            const worker = new Worker("./web-worker-map-parsing.js");

            worker.onerror = ({ message }) => {
                reject(message);
            }

            worker.onmessageerror =({ message }) => {
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
        canvasEl.width += zoomFactor;
        canvasEl.height = calculateRatioHeight(canvasEl.width);
    } else if (direction == -1) {
        console.log("unzooming");
        canvasEl.width -= zoomFactor;
        canvasEl.height = calculateRatioHeight(canvasEl.width);
    }

}


const tick = async (T) => {

    ctx.putImageData( image, -1 * world.header.maxTilesX / 2 + width / 2, 0 );

    if (running)
        requestAnimationFrame(tick, canvasEl);
}

export default init;