import store from "/state/store.js";
import { stateChange } from "/state/state.js";
import api from "/utils/api/api.js";

export default function(_interface, e) {
    console.error("worker interface " + _interface + " error:", e);

    if (e.name == "TerrariaWorldParserError") {
        if (e.onlyName == "RangeError")
            store.dispatch(stateChange(["status", "error"], "Your map file is corrupted AND missing data. Check map loading menu settings"));
        else if (e.onlyMessage.includes("end offset"))
            store.dispatch(stateChange(["status", "error"], "Your map file is corrupted. Check map loading menu settings"));
        else if (e.onlyMessage == "Invalid file type" || e.onlyMessage == "Map version is older than 1.3.5.3 and cannot be parsed")
            store.dispatch(stateChange(["status", "error"], e.onlyMessage));
        else
            store.dispatch(stateChange(["status", "error"], e.onlyFriendlyMessage + ": " + e.onlyMessage + ". Check map loading menu settings"));
    } else if (e.name == "TerrariaWorldSaverError")
        store.dispatch(stateChange(["status", "error"], e.onlyFriendlyMessage + ": " + e.onlyMessage + ". Error was sent to us and we hope it will be fixed soon."));
    else if (e.message && e.message.includes("memory"))
        store.dispatch(stateChange(["status", "error"], "You ran out of memory. Sorry, a lot of tiles."));
    else
        store.dispatch(stateChange(["status", "error"], "Unexpected worker error. Error was sent to us and we hope it will be fixed soon."));

    store.dispatch(stateChange(["status", "loading"], false));

    api.post("/report/error-auto", {
        text: _interface + ": " + JSON.stringify(e)
    });
}