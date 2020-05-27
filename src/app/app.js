import auth from "/utils/api/auth.js";
import store from "/state/store.js";
import { stateChangeWorldFile, stateChangeWorldObject, stateToggleViewOption, stateChangeRunning, stateChangeUser } from "/state/modules/app.js";
import { stateChangePercentage, stateChangeDescription, stateChangeError } from "/state/modules/status.js";

async function loadSessionLogin() {
    const getUser = await auth.get("/user");

    if (getUser.id) {
        store.dispatch(stateChangeUser(getUser));
    }
}

function onPageLoad() {
    loadSessionLogin();
}

function resetWorld(openingAnotherMapRightAfter = false) {
    store.dispatch(stateChangeRunning(false));
    if (!openingAnotherMapRightAfter)
        store.dispatch(stateChangeWorldFile(null));
    store.dispatch(stateChangeWorldObject(null));
    store.dispatch(stateChangePercentage(null));
    store.dispatch(stateChangeError(null));
}

export {
    onPageLoad,
    resetWorld
}