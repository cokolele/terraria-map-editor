import Main from "/canvas/main.js";

import { onPencilClick } from "/canvas/tools/pencil.js";
import { onBucketClick } from "/canvas/tools/bucket.js";
import { onEraserClick } from "/canvas/tools/eraser.js";

const onDebugClick = (e) => {
    console.log("hm");
}

export default function(e) {
    if (window.debug)
        onDebugClick(e);
    else if (Main.state.toolbar.tool == "pencil")
        onPencilClick(e);
    else if (Main.state.toolbar.tool == "bucket")
        onBucketClick(e);
    else if (Main.state.toolbar.tool == "eraser")
        onEraserClick(e);
}