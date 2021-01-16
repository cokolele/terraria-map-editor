import localSettings from "/utils/localSettings.js";
import store from "/state/store.js";
import { stateChange, stateToggle } from "/state/state.js";
import api from "/utils/api/api.js";

import Main from "/canvas/main.js";

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
        store.dispatch(stateChange(["status", "description"], "Loading map from file"));
        store.dispatch(stateChange(["canvas", "worldFile"], file));
    }
}

const onSaveImage = async () => {
    const worldImageUrl = Main.extensions.getImageUrl();
    const worldFileName = Main.state.canvas.worldFile.name;

    if (worldImageUrl === null)
        return;

    let worldPngBlob = await fetch(worldImageUrl);
    worldPngBlob = await worldPngBlob.blob();
    worldPngBlob = new Blob([worldPngBlob], { type: "image/png" });

    const worldPngBlobUrl = URL.createObjectURL(worldPngBlob);

    const link = document.createElement("a");
    link.download = worldFileName.replace(" ", "_") + ".png";
    link.href = worldPngBlobUrl;
    link.click();

    URL.revokeObjectURL(worldPngBlobUrl);
}

const onSaveFile = async (e) => {
    if (!localSettings.get("savingDisclaimerChecked", false))
        store.dispatch(stateChange("modal", "savingdisclaimer"));

    const newWorldFile = await Main.extensions.saveWorldFile();
    const newWorldFileName = Main.state.canvas.worldObject.header.mapName.replace(" ", "_") + ".wld";

    if (newWorldFile === null)
        return;

    const link = document.createElement("a");
    const blob = new Blob([newWorldFile], { type: "octet/stream" });
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = newWorldFileName;
    link.click();

    URL.revokeObjectURL(url);
}

const onCloseFile = (e) => {
    store.dispatch(stateChange(["canvas", "worldFile"], null));
}

const onExampleMap = async (map) => {
    store.dispatch(stateChange(["status", "description"], "Downloading the map"));
    let mapFile = await api.get("/public/maps/" + map, "application/octet-stream");

    if (mapFile.status == "error") {
        store.dispatch(stateChange(["status", "description"], "Map download failed"));
        store.dispatch(stateChange(["status", "error"], mapFile.message));
        return;
    }

    if (mapFile.type == "") {
        store.dispatch(stateChange(["status", "description"], "Map download failed"));
        store.dispatch(stateChange(["status", "error"], "Unexpected network error"));
        return;
    }

    mapFile = new File([mapFile], map + ".wld");
    store.dispatch(stateChange(["canvas", "worldFile"], mapFile));
}

const onToggleToolbar = (value) => {
    store.dispatch(stateToggle(["view", "toolbar"]));
    localSettings.set("toolbar", value);
}

const onToggleSidebar = (value) => {
    store.dispatch(stateToggle(["view", "sidebar"]));
    localSettings.set("sidebar", value);
}

const onPluginBlockSwap = () => {
    try {
        Main.extensions.blockSwap();
    } catch(e) {

    }
}

const onWebsiteZoom = (option) => {
    const htmlEl = document.getElementsByTagName("html")[0];
    let size = parseFloat(htmlEl.style.fontSize.replace("%", ""));

    if (option == "in")
        size += 12.5;
    else if (option == "out")
        size -= 12.5;
    else if (option == "reset")
        size = 87.5;

    htmlEl.style.fontSize = size + "%";
    localSettings.set("htmlFontSize", size);
}

export default {
    onNewFile,
    onExampleMap,
    onCloseFile,
    onSaveImage,
    onSaveFile,
    onToggleSidebar,
    onToggleToolbar,
    onPluginBlockSwap,
    onWebsiteZoom
};