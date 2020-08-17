import Worker from "/canvas/worker.js";

export default function({ x, y }) {
    postMessage({
        action: "RETURN_TILE_DATA",
        tileData: Worker.worldObject.tiles[x][y]
    });
}