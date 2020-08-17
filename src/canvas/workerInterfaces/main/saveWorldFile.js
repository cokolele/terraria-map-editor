import Main from "/canvas/main.js";

import WorkerError from "/canvas/workerInterfaces/errors/WorkerError.js";

export default function({ worldObject, onSaveStart, onSaveProgress }) {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "ERROR":
                    WorkerError("saveWorldFile", data.error);
                    resolve(null);
                    break;

                case "RETURN_SAVING_PERCENT_INCOMING":
                    onSaveStart();
                    break;
                case "RETURN_SAVING_PERCENT":
                    onSaveProgress(data.percent);
                    break;
                case "RETURN_NEW_WORLD_FILE":
                    resolve(data.newWorldFile);
                    break;
            }
        }

        Main.worker.postMessage({
            action: "SAVE_WORLD_FILE",
            worldObject
        });
    });
}