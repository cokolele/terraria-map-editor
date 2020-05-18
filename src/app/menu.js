import store from "/state/store.js";
import { stateChangeWorldFile, stateChangeWorldObject, stateToggleViewOption, stateChangeRunning } from "/state/modules/app.js";
import { stateChangePercentage, stateChangeDescription, stateChangeError } from "/state/modules/status.js";
import { saveToLocalSettings } from "/utils/localStorage.js";
import api from "/utils/api/api.js";

import { resetWorld } from "/app/app.js";
import { getCanvasMapData, getCanvasMapFile } from "/app/canvas/main.js";

let worldObject;

const setWorldObject = (_worldObject) => {
    worldObject = _worldObject;
}

const onNewFile = (e, file) => {
    if (file == undefined) {
        const inputElHidden = document.createElement("input");
        inputElHidden.setAttribute("type", "file");
        inputElHidden.setAttribute("accept", ".wld");
        inputElHidden.addEventListener("input", async () => {
           onNewFile(null, inputElHidden.files[0]);
        });
        inputElHidden.click();
    } else {
        resetWorld();
        store.dispatch(stateChangeDescription("Loading map from file"));
        store.dispatch(stateChangeWorldFile(file));
    }
}

const onSaveImage = async () => {
    const data = getCanvasMapData({ name: true, imageUrlPng: true });

    if (data !== null) {
        let mapBlob = await fetch(data.imageUrlPng);
        mapBlob = await mapBlob.blob();
        mapBlob = new Blob([mapBlob], {type: "image/png"});

        const blobUrl = URL.createObjectURL(mapBlob);

        const link = document.createElement("a");
        link.download = data.name.replace(" ", "_") + ".png";
        link.href = blobUrl;
        link.click();
    }
}

const onSaveFile = async (e) => {
    const file = await getCanvasMapFile(worldObject);
    if (!file) return;

    const link = document.createElement("a");
    const blob = new Blob([file], {type: "octet/stream"});
    const url = window.URL.createObjectURL(blob);

    link.href = url;
    link.download = worldObject.header.mapName + ".wld";
    link.click();

    window.URL.revokeObjectURL(url);
}

const onCloseFile = (e) => {
    resetWorld();
}

const onExampleMap = async (e) => {
    let mapFile = await api.get("/public/maps/example", "application/octet-stream");
    console.log(mapFile);

    if (mapFile.status == "error") {
        store.dispatch(stateChangeDescription("Map download failed"));
        store.dispatch(stateChangeError(mapFile.message));
        return;
    }

    mapFile = new File([mapFile], "example.wld");
    resetWorld();
    store.dispatch(stateChangeWorldFile(mapFile));
}

const onToggleToolbar = (value) => {
    store.dispatch(stateToggleViewOption("toolbar"));
    saveToLocalSettings("toolbar", value);
}

const onToggleSidebar = (value) => {
    store.dispatch(stateToggleViewOption("sidebar"));
    saveToLocalSettings("sidebar", value);
}

export {
    onNewFile,
    onExampleMap,
    onCloseFile,
    onSaveImage,
    onSaveFile,
    onToggleSidebar,
    onToggleToolbar,

    setWorldObject
};