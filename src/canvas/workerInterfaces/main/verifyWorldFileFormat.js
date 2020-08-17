import Main from "/canvas/main.js";

import WorkerError from "/canvas/workerInterfaces/errors/WorkerError.js";

export default function(worldFile) {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "ERROR":
                    WorkerError("verifyWorldFileFormat", data.error);
                    resolve(null);
                    break;

                case "RETURN_MAP_FILE_VALIDITY":
                    resolve(data.valid);
                    break;
            }
        }

        Main.worker.postMessage({
            action: "VERIFY_WORLD_FILE_FORMAT",
            worldFile
        });
    });
}