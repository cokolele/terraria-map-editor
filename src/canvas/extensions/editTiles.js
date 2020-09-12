import Main from "/canvas/main.js";

import LAYERS from "/utils/dbs/LAYERS.js";

export default function(LAYER, editType, editArgs, newId) {
    if (!Main.state.canvas.running)
        return;

    store.dispatch(stateChange(["status", "loading"], true));

    if (editType)

    let tilesArray = [];

    if (typeof Main.state.optionbar.size == "number") {
        let sizeHalf = Main.state.optionbar.size / 2;

        for (let x = Main.mousePosImageX - Math.floor(sizeHalf); x < Main.mousePosImageX + Math.ceil(sizeHalf); x++)
            for (let y = Main.mousePosImageY - Math.floor(sizeHalf); y < Main.mousePosImageY + Math.ceil(sizeHalf); y++)
                if (x >= 0 && y >= 0 && x < Main.state.canvas.worldObject.header.maxTilesX && y < Main.state.canvas.worldObject.header.maxTilesY)
                    tilesArray.push([x,y]);
    } else {
        let sizeHalfX = Main.state.optionbar.size[0] / 2,
            sizeHalfY = Main.state.optionbar.size[1] / 2;

        for (let x = Main.mousePosImageX - Math.floor(sizeHalfX); x < Main.mousePosImageX + Math.ceil(sizeHalfX); x++)
            for (let y = Main.mousePosImageY - Math.floor(sizeHalfY); y < Main.mousePosImageY + Math.ceil(sizeHalfY); y++)
                if (x >= 0 && y >= 0 && x < Main.state.canvas.worldObject.header.maxTilesX && y < Main.state.canvas.worldObject.header.maxTilesY)
                    tilesArray.push([x,y]);
    }

    let offset, selectedColor = colors[Main.state.optionbar.layer][Main.state.optionbar.id];
    tilesArray.forEach(([x, y]) => {
        offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
        Main.layersImages[Main.state.optionbar.layer].data[offset] = selectedColor.r;
        Main.layersImages[Main.state.optionbar.layer].data[offset+1] = selectedColor.g;
        Main.layersImages[Main.state.optionbar.layer].data[offset+2] = selectedColor.b;
        Main.layersImages[Main.state.optionbar.layer].data[offset+3] = selectedColor.a;
    });

    Main.updateLayers(Main.state.optionbar.layer);


    if (LAYER !== LAYERS.BACKGROUND)
        return Main.workerInterfaces.editTiles(
            LAYER,
            editType,
            editArgs,
            newId
        );

    store.dispatch(stateChange(["status", "loading"], false));
}