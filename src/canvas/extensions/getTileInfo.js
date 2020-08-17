import Main from "/canvas/main.js";

async function getTileData(x, y) {
    if (x === undefined)
        x = Main.mousePosImageX;
    if (y === undefined)
        y = Main.mousePosImageY;

    return await Main.workerInterfaces.getTileData(x, y);
}

function getTileColor(LAYER, x, y) {
    if (x === undefined)
        x = Main.mousePosImageX;
    if (y === undefined)
        y = Main.mousePosImageY;

    const offset = (state.canvas.worldObject.header.maxTilesX * y + x) * 4;
    return {
        r: Main.layersImages[LAYER].data[offset],
        g: Main.layersImages[LAYER].data[offset+1],
        b: Main.layersImages[LAYER].data[offset+2],
        a: Main.layersImages[LAYER].data[offset+3]
    }
}

export {
    getTileData,
    getTileColor
}