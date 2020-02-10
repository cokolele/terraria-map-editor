import api from "/utils/api/api.js";
import store from "/state/store.js";
import { stateChangeWorldFile, stateChangeWorldObject, stateToggleViewOption, stateChangeRunning, stateChangeUser } from "/state/modules/app.js";
import { stateChangePercentage, stateChangeDescription, stateChangeError } from "/state/modules/status.js";

async function loadSessionLogin() {
    const session = await api.get("/session");

    if (session.status == "ok" && session.message == "Logged in") {
        store.dispatch(stateChangeUser(session.user));
    }
}

function onPageLoad() {
    loadSessionLogin();
}

function resetWorld() {
    store.dispatch(stateChangeWorldFile(null));
    store.dispatch(stateChangeWorldObject(null));
    store.dispatch(stateChangeRunning(false));
    store.dispatch(stateChangePercentage(null));
    store.dispatch(stateChangeDescription(null));
    store.dispatch(stateChangeError(null));
}

export {
    onPageLoad,
    resetWorld
}