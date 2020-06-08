import WorkerError from "/app/canvas/workerInterfaces/errors/WorkerError.js";
import WorkerInterfaceError from "/app/canvas/workerInterfaces/errors/WorkerInterfaceError.js";
import Main from "/app/canvas/main.js";

//basic
export default function() {
    Main.worker.onmessage = ({ data }) => {
        try {
            switch(data.action) {
                case "ERROR":
                    WorkerError("basic", data.e);
                    break;
            }
        } catch(e) {
            WorkerInterfaceError("basic", e);
        }
    }

    worker.postMessage({
        action: "none"
    });
}

//returning (async)
export default function() {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            try {
                switch(data.action) {
                    case "ERROR":
                        WorkerError("returning", data.e);
                        resolve(null);
                        break;
                }
            } catch(e) {
                WorkerInterfaceError("returning", e);
                resolve(null);
            }
        }

        worker.postMessage({
            action: "none"
        });
    }
}