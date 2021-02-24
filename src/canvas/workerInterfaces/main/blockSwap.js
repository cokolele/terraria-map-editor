import Main from "src/canvas/main.js";

import WorkerError from "src/canvas/workerInterfaces/errors/WorkerError.js";

export default function({ onProgress }) {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "ERROR":
                    WorkerError("blockSwap", data.error);
                    resolve(null);
                    break;

                case "RETURN_PROGRESS":
                    onProgress(data.percent);
                    break;
                case "RETURN_DONE":
                    resolve(null);
                    break;
            }
        };

        Main.worker.postMessage({
            action: "BLOCK_SWAP"
        });
    });
}