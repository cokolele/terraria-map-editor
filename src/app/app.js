import api from "/utils/api/api.js";
import store from "/state/store.js";
import { stateChangeUser } from "/state/modules/app.js";

async function loadSessionLogin() {
    const session = await api.get("/session");

    if (session.status == "ok" && session.message == "Logged in") {
        store.dispatch(stateChangeUser(session.user));
    }
}

loadSessionLogin();