import store from "/state/store.js";
import { changeWorldFile, toggleOption } from "/state/modules/menu.js";
import { changePercentage, changeDescription, changeError } from "/state/modules/status.js";

const DIVIDER = "__DIVIDER__";

const inputElHidden = document.createElement("input");
inputElHidden.setAttribute("type", "file");
inputElHidden.setAttribute("accept", ".wld");
inputElHidden.addEventListener("input", async () => {
   onNewFile(null, inputElHidden.files[0]);
});

const onNewFile = (e, file) => {
    if (file == undefined) {
        onCloseFile();
        inputElHidden.click();
    } else {
        store.dispatch(changeWorldFile(file));
    }
}

const onSaveFile = (e) => {
    console.log("clicked save file");
}

const onCloseFile = (e) => {
    store.dispatch(changeWorldFile(null));
    store.dispatch(changeDescription(null));
    store.dispatch(changeError(null));
}

const debugFile = (e) => {
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

const onToggleToolbar = () => {
    store.dispatch(toggleOption(["view", "toolbar"]));
}

const onToggleSidebar = () => {
    store.dispatch(toggleOption(["view", "sidebar"]));
}

const menuOptionsConfig = {
    File: {
        "Open...": onNewFile,
        "Select example map": debugFile,
        "_Save": onSaveFile,
        DIVIDER,
        "Close": onCloseFile
    },
    Edit: {
        DIVIDER
    },
    View: {
        "Toolbar": {
            type: "checkbox",
            for: ["view", "toolbar"],
            onClick: onToggleToolbar
        },
        "Sidebar": {
            type: "checkbox",
            for: ["view", "sidebar"],
            onClick: onToggleSidebar
        }
    }
}

export default menuOptionsConfig;