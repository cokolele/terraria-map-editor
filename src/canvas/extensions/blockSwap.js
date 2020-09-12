import Main from "/canvas/main.js";

import store from "/state/store.js";
import { stateChange } from "/state/state.js";

export default async function() {
    if (!Main.state.canvas.running)
        return;

    store.dispatch(stateChange([
        [["status", "error"], null],
        [["status", "loading"], true],
        [["status", "description"], "Changing blocks"]
    ]));

    await Main.workerInterfaces.blockSwap({
        onProgress: (percent) => {
            store.dispatch(stateChange(["status", "percent"], percent));
        },
    });

    const layersImages = await Main.workerInterfaces.renderLayersImages({
        onRenderingStart: () => {
            store.dispatch(stateChange(["status", "description"], "Rendering"));
        },

        onRenderingProgress: (percent) => {
            store.dispatch(stateChange(["status", "percent"], percent));
        },

        onRenderingDone: () => {
            store.dispatch(stateChange(["status", "description"], "Copying...")); //copying images from the worker takes time
        }
    });

    if (layersImages === null) {
        Main.extensions.closeMap();
        return;
    }

    Main.layersImages = layersImages;
    Main.updateLayers();
    store.dispatch(stateChange([
        [["status", "description"], "Finished"],
        [["status", "loading"], false]
    ]));
}