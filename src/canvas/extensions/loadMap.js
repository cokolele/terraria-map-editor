import Main from "/canvas/main.js";

import store from "/state/store.js";
import { stateChange } from "/state/state.js";

export default async function() {
    if (Main.state.canvas.running)
        Main.loop.stop();

    store.dispatch(stateChange([
        [["status", "error"], null],
        [["status", "loading"], true]
    ]));

    const worldObject = await Main.workerInterfaces.parseWorldFile({
        worldFile: Main.state.canvas.worldFile,
        unsafe: Main.state.canvas.unsafe,
        unsafeOnlyTiles: Main.state.canvas.unsafeOnlyTiles,
        ignoreBounds: Main.state.canvas.ignoreBounds,

        onParseStart: () => {
            store.dispatch(stateChange(["status", "description"], "Parsing"));
        },

        onParseProgress: (percent) => {
            store.dispatch(stateChange(["status", "percent"], percent));
        }
    });

    if (worldObject === null) {
        Main.extensions.closeMap();
        return;
    }

    store.dispatch(stateChange(["canvas", "worldObject"], worldObject));
    console.log(worldObject);

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
    Main.loop.start();
    store.dispatch(stateChange([
        [["status", "description"], "Finished"],
        [["status", "loading"], false]
    ]));
}