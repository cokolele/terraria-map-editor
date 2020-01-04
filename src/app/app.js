import api from "/utils/api/api.js";
import store from "/state/store.js";
import { changeUser } from "/state/modules/app.js";

async function loadSessionLogin() {
    try {
        const session = await api.get("/session");

        if (session.status == "ok" && session.message == "Logged in") {
            store.dispatch(changeUser(session.user));
        }
    } catch(e) {
        console.log("api call error");
        console.error(e);
    }
}

loadSessionLogin();