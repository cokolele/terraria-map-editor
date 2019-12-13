import store from "/state/store.js";
import { changeWorldFile } from "/state/modules/menu.js";
import { changePercentage, changeDescription } from "/state/modules/status.js";

const DIVIDER = "__DIVIDER__";

const inputElHidden = document.createElement("input");
inputElHidden.setAttribute("type", "file");
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
}

const debugFile = (e) => {
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
}

const menuOptionsConfig = {
    File: {
        "New File": onNewFile,
        "_SELECT_DEBUG_FILE": debugFile,
        "Save": onSaveFile,
        DIVIDER,
        "Close": onCloseFile
    },
    Edit: {
        DIVIDER
    },
    View: {
        DIVIDER
    }
}

export default menuOptionsConfig;