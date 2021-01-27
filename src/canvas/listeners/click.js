import Main from "/canvas/main.js";

import store from "/state/store.js";
import { stateChange, stateFire } from "/state/state.js";

import { onPencilClick } from "/canvas/tools/pencil.js";
import { onBucketClick } from "/canvas/tools/bucket.js";
import { onEraserClick } from "/canvas/tools/eraser.js";

export default function(e) {
    store.dispatch(stateFire(["canvas", "events", "click"]));

    if (Main.state.toolbar.tool == "pencil")
        onPencilClick(e);
    else if (Main.state.toolbar.tool == "bucket")
        onBucketClick(e);
    else if (Main.state.toolbar.tool == "eraser")
        onEraserClick(e);
}