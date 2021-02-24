import Main from "src/canvas/main.js";

import store from "src/state/store.js";
import { stateChange, stateFire } from "src/state/state.js";

import { onPencilClick } from "src/canvas/tools/pencil.js";
import { onBucketClick } from "src/canvas/tools/bucket.js";
import { onEraserClick } from "src/canvas/tools/eraser.js";

export default function(e) {
    store.dispatch(stateFire(["canvas", "events", "click"]));

    if (Main.state.toolbar.tool == "pencil")
        onPencilClick(e);
    else if (Main.state.toolbar.tool == "bucket")
        onBucketClick(e);
    else if (Main.state.toolbar.tool == "eraser")
        onEraserClick(e);
}