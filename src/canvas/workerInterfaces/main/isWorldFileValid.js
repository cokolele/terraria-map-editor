import WorkerError from "/app/canvas/workerInterfaces/errors/WorkerError.js";
import WorkerInterfaceError from "/app/canvas/workerInterfaces/errors/WorkerInterfaceError.js";
import Main from "/app/canvas/main.js";

export default function(mapFile) {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            try {
                switch(data.action) {
                    case "ERROR":
                        WorkerError("getIsMapFileValid", data.e);
                        resolve(null);
                        break;

                    case "RETURN_MAP_FILE_VALIDITY":
                        resolve(data.valid);
                        break;
                }
            } catch(e) {
                WorkerInterfaceError("getIsMapFileValid", e);
                resolve(null);
            }
        }

        Main.worker.postMessage({
            action: "VERIFY_MAP_FILE",
            mapFile
        });
    }
}