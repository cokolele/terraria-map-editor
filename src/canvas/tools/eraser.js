import Main from "/canvas/main.js";

import LAYERS from "/utils/dbs/LAYERS.js";

import store from "/state/store.js";
import { stateChange } from "/state/state.js";

const onEraserClick = async (e) => {
    if (Main.listeners.dragging) {
        Main.listeners.dragging = false;
        return;
    }

    store.dispatch(stateChange(["status", "loading"], true));

    let tilesArray = [];

    let sizeHalfX = Main.state.optionbar.size[0] / 2,
        sizeHalfY = Main.state.optionbar.size[1] / 2;

    for (let x = Main.mousePosImageX - Math.floor(sizeHalfX); x < Main.mousePosImageX + Math.ceil(sizeHalfX); x++)
        for (let y = Main.mousePosImageY - Math.floor(sizeHalfY); y < Main.mousePosImageY + Math.ceil(sizeHalfY); y++)
            if (x >= 0 && y >= 0 && x < Main.state.canvas.worldObject.header.maxTilesX && y < Main.state.canvas.worldObject.header.maxTilesY)
                tilesArray.push([x,y]);

    let offset, allLayers = [LAYERS.TILES, LAYERS.WALLS, LAYERS.WIRES, LAYERS.LIQUIDS];
    if (Main.state.optionbar.layer == 100) { // 100 = all
        tilesArray.forEach(([x, y]) => {
            allLayers.forEach(LAYER => {
                offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
                Main.layersImages[LAYER].data[offset] = 0;
                Main.layersImages[LAYER].data[offset+1] = 0;
                Main.layersImages[LAYER].data[offset+2] = 0;
                Main.layersImages[LAYER].data[offset+3] = 0;
            });
        });
        Main.updateLayers();
    } else {
        tilesArray.forEach(([x, y]) => {
            offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
            Main.layersImages[Main.state.optionbar.layer].data[offset] = 0;
            Main.layersImages[Main.state.optionbar.layer].data[offset+1] = 0;
            Main.layersImages[Main.state.optionbar.layer].data[offset+2] = 0;
            Main.layersImages[Main.state.optionbar.layer].data[offset+3] = 0;
        });
        Main.updateLayers(Main.state.optionbar.layer);
    }

    await Main.workerInterfaces.editTiles(
        Main.state.optionbar.layer,
        "rectangle",
        [tilesArray[0], tilesArray[tilesArray.length - 1]],
        "delete"
    );

    store.dispatch(stateChange(["status", "loading"], false));
}

const onEraserDrag = async (e) => {
    if (!Main.listeners.dragging)
        Main.listeners.dragging = true;

    if (Main.mousePosImageX == Main.listeners.prevMousePosImageX && Main.mousePosImageY == Main.listeners.prevMousePosImageY)
        return;

    store.dispatch(stateChange(["status", "loading"], true));

    Main.listeners.prevMousePosImageX = Main.mousePosImageX;
    Main.listeners.prevMousePosImageY = Main.mousePosImageY;

    let tilesArray = [];

    let sizeHalfX = Main.state.optionbar.size[0] / 2,
        sizeHalfY = Main.state.optionbar.size[1] / 2;

    for (let x = Main.mousePosImageX - Math.floor(sizeHalfX); x < Main.mousePosImageX + Math.ceil(sizeHalfX); x++)
        for (let y = Main.mousePosImageY - Math.floor(sizeHalfY); y < Main.mousePosImageY + Math.ceil(sizeHalfY); y++)
            if (x >= 0 && y >= 0 && x < Main.state.canvas.worldObject.header.maxTilesX && y < Main.state.canvas.worldObject.header.maxTilesY)
                tilesArray.push([x,y]);

    let offset, allLayers = [LAYERS.TILES, LAYERS.WALLS, LAYERS.WIRES, LAYERS.LIQUIDS];
    if (Main.state.optionbar.layer == 100) { // 100 = all
        tilesArray.forEach(([x, y]) => {
            allLayers.forEach(LAYER => {
                offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
                Main.layersImages[LAYER].data[offset] = 0;
                Main.layersImages[LAYER].data[offset+1] = 0;
                Main.layersImages[LAYER].data[offset+2] = 0;
                Main.layersImages[LAYER].data[offset+3] = 0;
            });
        });
        Main.updateLayers();
    } else {
        tilesArray.forEach(([x, y]) => {
            offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
            Main.layersImages[Main.state.optionbar.layer].data[offset] = 0;
            Main.layersImages[Main.state.optionbar.layer].data[offset+1] = 0;
            Main.layersImages[Main.state.optionbar.layer].data[offset+2] = 0;
            Main.layersImages[Main.state.optionbar.layer].data[offset+3] = 0;
        });
        Main.updateLayers(Main.state.optionbar.layer);
    }

    await Main.workerInterfaces.editTiles(
        Main.state.optionbar.layer,
        "rectangle",
        [tilesArray[0], tilesArray[tilesArray.length - 1]],
        "delete"
    );

    store.dispatch(stateChange(["status", "loading"], false));
}

export {
    onEraserClick,
    onEraserDrag
}