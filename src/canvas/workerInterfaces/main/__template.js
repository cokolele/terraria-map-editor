import Main from "/canvas/main.js";

import WorkerError from "/canvas/workerInterfaces/errors/WorkerError.js";

//basic
export default function() {
    Main.worker.onmessage = ({ data }) => {
        switch(data.action) {
            case "ERROR":
                WorkerError("basic", data.error);
                break;
        }
    }

    Main.worker.postMessage({
        action: "none"
    });
}

//returning (async)
export default function() {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "ERROR":
                    WorkerError("returning", data.e);
                    resolve(null);
                    break;
            }
        }

        Main.worker.postMessage({
            action: "none"
        });
    });
}