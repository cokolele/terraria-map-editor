import store from "/state/store.js";
import { stateChange } from "/state/state.js";
import api from "/utils/api/api.js";

export default function(_interface, e) {
    console.error("worker interface error:", e);
    store.dispatch(stateChange(["status", "error"], "Unexpected fatal worker interface error. Error was sent to us and we hope it will be fixed soon."));
    api.post("/report/error-auto", {
        text: _interface + ": " + JSON.stringify({
            name: e.name,
            message: e.message,
            stack: e.stack
        })
    });
}