import Worker from "/canvas/worker.js";

import terrariaWorldParser from "/../terraria-world-file-js/src/browser/terraria-world-parser.js";

export default async function({ worldFile, unsafe, unsafeOnlyTiles, ignoreBounds }) {
    postMessage({
        action: "RETURN_PARSING_PERCENT_INCOMING",
    });

    Worker.worldObject = await new terrariaWorldParser().loadFile(worldFile);

    if (unsafeOnlyTiles) {
        Worker.worldObject = Worker.worldObject.parse({
            sections: ["tiles", "necessary"],
            ignorePointers: unsafe,
            ignoreBounds,
            progressCallback: (percent) => {
                postMessage({
                    action: "RETURN_PARSING_PERCENT",
                    percent: percent
                });
            }
        });
        Worker.worldObject.fileFormatHeader = {
            version: Worker.worldObject.necessary.version,
            pointers: Worker.worldObject.necessary.pointers,
            importants: Worker.worldObject.necessary.importants
        };
        Worker.worldObject.header = {
            maxTilesX: Worker.worldObject.necessary.width,
            maxTilesY: Worker.worldObject.necessary.height,
        };

        if (Worker.worldObject.necessary.width == 4200) {
            Worker.worldObject.header.worldSurface = 332;
            Worker.worldObject.header.rockLayer = 460;
        } else if (Worker.worldObject.necessary.width == 6400) {
            Worker.worldObject.header.worldSurface = 486;
            Worker.worldObject.header.rockLayer = 690;
        } else if (Worker.worldObject.necessary.width == 8400) {
            Worker.worldObject.header.worldSurface = 620;
            Worker.worldObject.header.rockLayer = 911;
        }
    } else {
        Worker.worldObject = Worker.worldObject.parse({
            ignorePointers: unsafe,
            ignoreBounds,
            progressCallback: (percent) => {
                postMessage({
                    action: "RETURN_PARSING_PERCENT",
                    percent: percent
                });
            }
        });
    }

    postMessage({
        action: "RETURN_WORLD_OBJECT",
        worldObject: {
            ...Worker.worldObject,
            tiles: undefined
        }
    });
}