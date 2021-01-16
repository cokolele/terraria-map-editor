import Main from "/canvas/main.js";

import store from "/state/store.js";
import { stateChange } from "/state/state.js";

import colors from "/utils/dbs/colors.js";

export default async function(from, to) {
    if (!Main.state.canvas.running)
        return;

    store.dispatch(stateChange([
        [["status", "error"], null],
        [["status", "loading"], true],
        [["status", "description"], "Replacing blocks"]
    ]));

    const replacedBlocks = await Main.workerInterfaces.blockReplace({
        from,
        to,

        onProgress: (percent) => {
            store.dispatch(stateChange(["status", "percent"], percent));
        },
    });

    store.dispatch(stateChange(["status", "description"], "Rendering"));

    let offset, selectedColor = colors[to.layer][to.id];
    replacedBlocks.forEach(([x, y]) => {
        offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;

        if (from.layer != to.layer) {
            Main.layersImages[from.layer].data[offset] = 0;
            Main.layersImages[from.layer].data[offset+1] = 0;
            Main.layersImages[from.layer].data[offset+2] = 0;
            Main.layersImages[from.layer].data[offset+3] = 0;
        }

        Main.layersImages[to.layer].data[offset] = selectedColor.r;
        Main.layersImages[to.layer].data[offset+1] = selectedColor.g;
        Main.layersImages[to.layer].data[offset+2] = selectedColor.b;
        Main.layersImages[to.layer].data[offset+3] = selectedColor.a;
    });

    Main.updateLayers(from.layer);
    Main.updateLayers(to.layer);
    store.dispatch(stateChange([
        [["status", "description"], "Finished"],
        [["status", "loading"], false]
    ]));
}