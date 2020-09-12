import Worker from "/canvas/worker.js";

import editableTiles from "/utils/dbs/editable-tiles.js";
import editableWalls from "/utils/dbs/editable-walls.js";

const arrayShuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array;
}

export default async function({ onProgress }) {
    let swappedTileIds = {},
        swappedWallIds = {};

    const shuffledTileIdsArray = arrayShuffle(Object.keys(editableTiles));
    for (const id in editableTiles)
        swappedTileIds[id] = shuffledTileIdsArray.shift();

    const shuffledWallIdsArray = arrayShuffle(Object.keys(editableWalls));
    for (const id in editableWalls)
        swappedWallIds[id] = shuffledWallIdsArray.shift();

    const swapOnePercent = Worker.worldObject.header.maxTilesY / 100;
    let swapPercentNext = 0;
    let swapPercent = 0;
    for (let y = 0; y < Worker.worldObject.header.maxTilesY; y++) {
        if (y > swapPercentNext) {
            swapPercentNext += swapOnePercent;
            swapPercent++;
            postMessage({
                action: "RETURN_PROGRESS",
                percent: swapPercent
            });
        }

        for (let x = 0; x < Worker.worldObject.header.maxTilesX; x++) {
            if (Worker.worldObject.tiles[x][y].blockId !== undefined && editableTiles[Worker.worldObject.tiles[x][y].blockId]) {
                Worker.worldObject.tiles[x][y] = {...Worker.worldObject.tiles[x][y]};
                Worker.worldObject.tiles[x][y].blockId = parseInt(swappedTileIds[Worker.worldObject.tiles[x][y].blockId]);

                if (Worker.worldObject.tiles[x][y].wallId !== undefined && editableWalls[Worker.worldObject.tiles[x][y].wallId]) {
                    Worker.worldObject.tiles[x][y].wallId = parseInt(swappedWallIds[Worker.worldObject.tiles[x][y].wallId]);
                    continue;
                }
            }

            if (Worker.worldObject.tiles[x][y].wallId !== undefined && editableWalls[Worker.worldObject.tiles[x][y].wallId]) {
                Worker.worldObject.tiles[x][y] = {...Worker.worldObject.tiles[x][y]};
                Worker.worldObject.tiles[x][y].wallId = parseInt(swappedWallIds[Worker.worldObject.tiles[x][y].wallId]);
            }
        }
    }

    postMessage({
        action: "RETURN_DONE",
    });
}