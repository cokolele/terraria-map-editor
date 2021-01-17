import Main from "/canvas/main.js";

import WorkerError from "/canvas/workerInterfaces/errors/WorkerError.js";

export default function({ from, to, onProgress }) {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "RETURN_PROGRESS":
                    onProgress(data.percent);
                    break;
                case "RETURN_DONE":
                    resolve(data.replacedBlocks);
                    break;

                case "ERROR":
                    WorkerError("blockReplace", data.e);
                    resolve(null);
                    break;
            }
        }

        Main.worker.postMessage({
            action: "BLOCK_REPLACE",
            from,
            to
        });
    });
}