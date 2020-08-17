import Main from "/canvas/main.js";

import WorkerError from "/canvas/workerInterfaces/errors/WorkerError.js";

export default function({ onRenderingStart, onRenderingProgress, onRenderingDone, onDone }) {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "ERROR":
                    WorkerError("renderLayersImages", data.error);
                    resolve(null);
                    break;

                case "RETURN_RENDERING_PERCENT_INCOMING":
                    onRenderingStart();
                    break;
                case "RETURN_RENDERING_PERCENT":
                    onRenderingProgress(data.percent);
                    break;
                case "RETURN_LAYERS_IMAGES_INCOMING":
                    onRenderingDone();
                    break;
                case "RETURN_LAYERS_IMAGES":
                    resolve(data.layersImages);
                    break;
            }
        };

        Main.worker.postMessage({
            action: "RENDER_LAYERS_IMAGES",
        });
    });
}