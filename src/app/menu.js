import store from "/state/store.js";
import { changeWorldFile } from "/state/modules/menu.js";

const DIVIDER = "__DIVIDER__";

const inputElHidden = document.createElement("input");
inputElHidden.setAttribute("type", "file");
inputElHidden.addEventListener("input", async () => {
    onNewFileUploaded(inputElHidden.files[0]);
});

const onNewFile = () => {
    onCloseFile();

    inputElHidden.click();
}

const onNewFileUploaded = (file) => {
    store.dispatch(changeWorldFile(file));
}

const onSaveFile = () => {
    console.log("clicked save file");
}

const onCloseFile = () => {
    store.dispatch(changeWorldFile(null));
}

const menuOptionsConfig = {
    File: [
        {
            optionLabel: "New File",
            optionFunc: onNewFile
        },
        {
            optionLabel: "Save",
            optionFunc: onSaveFile
        },
        DIVIDER,
        {
            optionLabel: "Close",
            optionFunc: onCloseFile
        }
    ],
    Edit: [
        {
            optionLabel: "New File",
            optionFunc: onNewFile
        },
        {
            optionLabel: "Save",
            optionFunc: onSaveFile
        },
        DIVIDER,
        {
            optionLabel: "Close",
            optionFunc: onCloseFile
        }
    ],
    View: [
        {
            optionLabel: "New File",
            optionFunc: onNewFile
        },
        {
            optionLabel: "Save",
            optionFunc: onSaveFile
        },
        DIVIDER,
        {
            optionLabel: "Close",
            optionFunc: onCloseFile
        }
    ]
}

export default menuOptionsConfig;