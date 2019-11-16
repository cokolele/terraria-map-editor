import "./polyfill-requestAnimationFrame.js";

import store from "/state/store.js";
import { changePercentage, changeDescription } from "/state/modules/status.js";

let worldFile;
let world;
let canvasEl, ctx;
let running = false;
let renderImage;

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

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
}

const init = (_canvasEl) => {
    canvasEl = _canvasEl;
    ctx = canvasEl.getContext("2d");

    canvasEl.width = canvasEl.clientWidth;
    canvasEl.height = canvasEl.clientHeight;

    window.addEventListener("resize", () => {
        canvasEl.width = canvasEl.clientWidth;
        canvasEl.height = canvasEl.clientHeight;
    });
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
                        renderImage = data.image;
                        ctx.putImageData( renderImage, 0, 0 );
                        running = true;
                        tick(0);
                        break;
                    case "RETURN_PARSED_MAP_INCOMING":
                        store.dispatch(changeDescription("Copying 2/2"));
                        break;
                    case "RETURN_PARSED_MAP":
                        world = data.world;
                        store.dispatch(changeDescription("Finished"));
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
        console.log(e);
        return;
    }
}

const tick = async (T) => {
    ctx.putImageData( renderImage, 0, 0 );

    if (running)
        requestAnimationFrame(tick, canvasEl);
}

export default init;