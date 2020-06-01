import { localSettings, saveToLocalSettings } from "/utils/localStorage.js";
import store from "/state/store.js";
import { stateChange, stateToggle, stateTriggerResetWorld } from "/state/state.js";
import api from "/utils/api/api.js";

import { getCanvasMapData, getCanvasMapFile } from "/app/canvas/main.js";

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
        store.dispatch(stateTriggerResetWorld());
        store.dispatch(stateChange(["status", "description"], "Loading map from file"));
        store.dispatch(stateChange(["canvas", "worldFile"], file));
    }
}

const onSaveImage = async () => {
    const data = getCanvasMapData({ fileName: true, imageUrlPng: true });

    if (data !== null) {
        let mapBlob = await fetch(data.imageUrlPng);
        mapBlob = await mapBlob.blob();
        mapBlob = new Blob([mapBlob], {type: "image/png"});

        const blobUrl = URL.createObjectURL(mapBlob);

        const link = document.createElement("a");
        link.download = data.fileName.replace(" ", "_") + ".png";
        link.href = blobUrl;
        link.click();
    }
}

const onSaveFile = async (e) => {
    if (!localSettings.savingDisclaimerChecked)
        store.dispatch(stateChange("modal", "savingdisclaimer"));

    const fileName = getCanvasMapData({ fileName: true });
    const file = await getCanvasMapFile();
    if (!file) return;

    const link = document.createElement("a");
    const blob = new Blob([file], {type: "octet/stream"});
    const url = window.URL.createObjectURL(blob);

    link.href = url;
    link.download = fileName + ".wld";
    link.click();

    window.URL.revokeObjectURL(url);
}

const onCloseFile = (e) => {
    store.dispatch(stateTriggerResetWorld());
}

const onExampleMap = async (map) => {
    store.dispatch(stateChange(["status", "description"], "Downloading the map"));
    let mapFile = await api.get("/public/maps/" + map, "application/octet-stream");

    if (mapFile.status == "error") {
        store.dispatch(stateChange(["status", "description"], "Map download failed"));
        store.dispatch(stateChange(["status", "error"], mapFile.message));
        return;
    }

    mapFile = new File([mapFile], map + ".wld");
    store.dispatch(stateTriggerResetWorld());
    store.dispatch(stateChange(["canvas", "worldFile"], mapFile));
}

const onToggleToolbar = (value) => {
    store.dispatch(stateToggle(["view", "toolbar"]));
    saveToLocalSettings("toolbar", value);
}

const onToggleSidebar = (value) => {
    store.dispatch(stateToggle(["view", "sidebar"]));
    saveToLocalSettings("sidebar", value);
}

export default {
    onNewFile,
    onExampleMap,
    onCloseFile,
    onSaveImage,
    onSaveFile,
    onToggleSidebar,
    onToggleToolbar
};