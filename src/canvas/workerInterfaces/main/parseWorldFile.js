import Main from "/canvas/main.js";

import WorkerError from "/canvas/workerInterfaces/errors/WorkerError.js";

export default function({ worldFile, unsafe, unsafeOnlyTiles, ignoreBounds, onParseStart, onParseProgress }) {
    return new Promise((resolve, reject) => {
        Main.worker.onmessage = ({ data }) => {
            switch(data.action) {
                case "ERROR":
                    WorkerError("parseWorldFile", data.error);
                    resolve(null);
                    break;

                case "RETURN_PARSING_PERCENT_INCOMING":
                    onParseStart();
                    break;
                case "RETURN_PARSING_PERCENT":
                    onParseProgress(data.percent);
                    break;
                case "RETURN_WORLD_OBJECT":
                    resolve(data.worldObject);
                    break;
            }
        };

        Main.worker.postMessage({
            action: "PARSE_WORLD_FILE",
            worldFile,
            unsafe,
            unsafeOnlyTiles,
            ignoreBounds
        });
    });
}