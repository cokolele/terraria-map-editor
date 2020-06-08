import Main from "/canvas/main.js";

import store from "/state/store.js";
import { stateChange } from "/state/state.js";

export default function() {
    if (Main.state.canvas.running) {
        Main.loop.stop();
        store.dispatch(stateChange([
            [["canvas", "worldFile"], null],
            [["canvas", "worldObject"], null],
            [["status", "description"], null],
            [["status", "percent"], null],
            [["status", "error"], null]
        ]));
    }
}