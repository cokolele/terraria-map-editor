import Main from "src/canvas/main.js";

import store from "src/state/store.js";
import { stateChange } from "src/state/state.js";

export default async function() {
    if (!Main.state.canvas.running)
        return null;

    const newWorldFile = await Main.workerInterfaces.saveWorldFile({
        worldObject: Main.state.canvas.worldObject,

        onSaveStart: () => {
            store.dispatch(stateChange(["status", "description"], "Generating"));
        },

        onSaveProgress: (percent) => {
            store.dispatch(stateChange(["status", "percent"], percent));
        }
    });

    store.dispatch(stateChange(["status", "percent"], null));

    if (newWorldFile === null) {
        store.dispatch(stateChange(["status", "description"], "Failed"));
        return null;
    }

    store.dispatch(stateChange(["status", "description"], "Finished"));
    return newWorldFile;
}