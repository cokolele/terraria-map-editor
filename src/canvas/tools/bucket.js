import Main from "src/canvas/main.js";

import store from "src/state/store.js";
import { stateChange } from "src/state/state.js";

import colors from "src/utils/dbs/colors.js";

const onBucketClick = async (e) => {
    store.dispatch(stateChange(["status", "loading"], true));

    const data = await Main.workerInterfaces.editTiles(
        Main.state.optionbar.layer,
        "floodfill",
        [Main.mousePosImageX, Main.mousePosImageY],
        Main.state.optionbar.id
    );

    if (data.tilesArray) {
        let x, y, offset, selectedColor = colors[Main.state.optionbar.layer][Main.state.optionbar.id];
        while (data.tilesArray.length) {
            y = data.tilesArray.shift();
            x = data.tilesArray.shift();
            offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
            Main.layersImages[Main.state.optionbar.layer].data[offset] = selectedColor.r;
            Main.layersImages[Main.state.optionbar.layer].data[offset+1] = selectedColor.g;
            Main.layersImages[Main.state.optionbar.layer].data[offset+2] = selectedColor.b;
            Main.layersImages[Main.state.optionbar.layer].data[offset+3] = selectedColor.a;
        }

        Main.updateLayers(Main.state.optionbar.layer);

        console.log("updated");
    }

    store.dispatch(stateChange(["status", "loading"], false));
}

export {
    onBucketClick
}