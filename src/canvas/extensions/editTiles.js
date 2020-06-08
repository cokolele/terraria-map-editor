import Main from "/canvas/main.js";

export default function() {
    if (!Main.state.canvas.running)
        return;

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