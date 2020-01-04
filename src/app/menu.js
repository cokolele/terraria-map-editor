import store from "/state/store.js";
import { changeWorldFile, changeWorldObject, toggleViewOption, changeModal } from "/state/modules/app.js";
import { changePercentage, changeDescription, changeError } from "/state/modules/status.js";
import { getLocalSettings, saveToLocalSettings } from "/utils/localStorage.js";

const DIVIDER = "__DIVIDER__";

const inputElHidden = document.createElement("input");
inputElHidden.setAttribute("type", "file");
inputElHidden.setAttribute("accept", ".wld");
inputElHidden.addEventListener("input", async () => {
   onNewFile(null, inputElHidden.files[0]);
});

const onNewFile = (e, file) => {
    if (file == undefined) {
        inputElHidden.click();
    } else {
        onCloseFile();
        store.dispatch(changeWorldFile(file));
    }
}

const onSaveFile = (e) => {
    console.log("clicked save file");
}

const onCloseFile = (e) => {
    store.dispatch(changeWorldFile(null));
    store.dispatch(changeWorldObject(null));
    store.dispatch(changePercentage(null));
    store.dispatch(changeDescription(null));
    store.dispatch(changeError(null));
}

const onExampleMap = (e) => {
    onCloseFile();

    store.dispatch(changeDescription("downloading map"));

    fetch("/downloadable/example_map.wld")
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], "example map");
            store.dispatch(changeWorldFile(file));
        })
        .catch(function(e) {
            store.dispatch(changeDescription("failed to download map"));
            console.error(e);
        });
}

const onToggleToolbar = (value) => {
    store.dispatch(toggleViewOption("toolbar"));
    saveToLocalSettings("toolbar", value);
}

const onToggleSidebar = (value) => {
    store.dispatch(toggleViewOption("sidebar"));
    saveToLocalSettings("sidebar", value);
}

const localSettings = getLocalSettings();

export default {
    File: {
        "Open...": onNewFile,
        "Open example map": onExampleMap,
        _Save: onSaveFile,
        DIVIDER,
        Close: onCloseFile
    },
    Edit: {
        DIVIDER
    },
    View: {
        Toolbar: {
            type: "checkbox",
            value: localSettings.toolbar !== undefined ? localSettings.toolbar : false,
            onClick: onToggleToolbar
        },
        Sidebar: {
            type: "checkbox",
            value: localSettings.sidebar !== undefined ? localSettings.sidebar : true,
            onClick: onToggleSidebar
        }
    }
}