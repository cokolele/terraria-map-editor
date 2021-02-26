import Worker from "/canvas/worker.js";

import LAYERS from "/utils/dbs/LAYERS.js";

export default async function({ from, to, onProgress }) {
    let replacedBlocks = [];
    let newProperties = {};
    let fromWire = from.layer == LAYERS.WIRES ? "wire" + from.id.charAt(0).toUpperCase() + from.id.slice(1) : null;

    switch (to.layer) {
        case LAYERS.TILES:
            newProperties.blockId = parseInt(to.id);
            break;
        case LAYERS.WALLS:
            newProperties.wallId = parseInt(to.id);
            break;
        case LAYERS.WIRES:
            newProperties["wire" + to.id.charAt(0).toUpperCase() + to.id.slice(1)] = true;
            break;
        case LAYERS.LIQUIDS:
            newProperties.liquidType = to.id;
            newProperties.liquidAmount = 255;
            break;
    }

    let tile;
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
            switch (from.layer) {
                case LAYERS.TILES:
                    if (Worker.worldObject.tiles[x][y].blockId !== undefined && Worker.worldObject.tiles[x][y].blockId == from.id){
                        Worker.worldObject.tiles[x][y] = { ...Worker.worldObject.tiles[x][y], blockId: undefined };
                        Worker.worldObject.tiles[x][y] = { ...Worker.worldObject.tiles[x][y], ...newProperties };
                        if (to.layer != LAYERS.TILES) {
                            delete Worker.worldObject.tiles[x][y].frameX;
                            delete Worker.worldObject.tiles[x][y].frameY;
                            delete Worker.worldObject.tiles[x][y].slope;
                            delete Worker.worldObject.tiles[x][y].blockColor;
                        }
                        replacedBlocks.push([x,y]);
                    }
                    break;
                case LAYERS.WALLS:
                    if (Worker.worldObject.tiles[x][y].wallId !== undefined && Worker.worldObject.tiles[x][y].wallId == from.id) {
                        Worker.worldObject.tiles[x][y] = { ...Worker.worldObject.tiles[x][y], wallId: undefined };
                        Worker.worldObject.tiles[x][y] = { ...Worker.worldObject.tiles[x][y], ...newProperties };
                        if (to.layer != LAYERS.WALLS)
                            delete Worker.worldObject.tiles[x][y].wallColor;
                        replacedBlocks.push([x,y]);
                    }
                    break;
                case LAYERS.WIRES:
                    if (Worker.worldObject.tiles[x][y][fromWire]) {
                        delete Worker.worldObject.tiles[x][y][fromWire];
                        Worker.worldObject.tiles[x][y] = { ...Worker.worldObject.tiles[x][y], ...newProperties };
                        replacedBlocks.push([x,y]);
                    }
                    break;
                case LAYERS.LIQUIDS:
                    if (Worker.worldObject.tiles[x][y].liquidType !== undefined && Worker.worldObject.tiles[x][y].liquidType == from.id) {
                        if (to.layer != LAYERS.LIQUIDS)
                            Worker.worldObject.tiles[x][y] = { ...Worker.worldObject.tiles[x][y], liquidType: undefined, liquidAmount: undefined, ...newProperties };
                        else
                            Worker.worldObject.tiles[x][y] = { ...Worker.worldObject.tiles[x][y], liquidType: newProperties.liquidType };
                        replacedBlocks.push([x,y]);
                    }
                    break;
            }
        }
    }

    postMessage({
        action: "RETURN_DONE",
        replacedBlocks
    });
}