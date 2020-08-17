import Main from "/canvas/main.js";

import WorkerError from "/canvas/workerInterfaces/errors/WorkerError.js";

export default function(LAYER, editType, editArgs, newId) {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "ERROR":
                    WorkerError("editTiles", data.error);
                    resolve(null);
                    break;

                case "RETURN_EDIT_TILES":
                    delete data.action;
                    resolve(data);
                    break;
            }
        };

        Main.worker.postMessage({
            action: "EDIT_TILES",
            LAYER,
            editType,
            editArgs,
            newId
        });
    });
}