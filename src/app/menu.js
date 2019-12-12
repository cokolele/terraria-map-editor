import store from "/state/store.js";
import { changeWorldFile } from "/state/modules/menu.js";
import { changePercentage, changeDescription } from "/state/modules/status.js";

import { serverBaseURI } from "/config.js";

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

const debugFile = () => {
    store.dispatch(changeDescription("downloading map"));

    fetch("/downloadable/Canvas.wld")
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], "example map");
            store.dispatch(changeWorldFile(file));
        })
        .catch(function(e) {
            store.dispatch(changeDescription("failed to download map"));
            console.error(e);
        });
/*
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://144.91.97.116/Canvas.wld', true);
xhr.overrideMimeType("application/octet-stream");
//xhr.setRequestHeader("Accept", "application/octet-stream");
xhr.responseType = "arraybuffer";
xhr.onload = function (v) {
    console.log(v);
};
xhr.onprogress = function (e) {
    console.log(e)
};
xhr.onerror = function (e) {
    console.log(xhr);
};
 xhr.onreadystatechange = function () {
   console.log(xhr);
 }
xhr.send();*/
}

const menuOptionsConfig = {
    File: [
        {
            optionLabel: "New File",
            optionFunc: onNewFile
        },
        {
            optionLabel: "_SELECT_DEBUG_FILE",
            optionFunc: debugFile
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
        DIVIDER
    ],
    View: [
        DIVIDER
    ]
}

export default menuOptionsConfig;