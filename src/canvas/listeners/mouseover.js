import Main from "/canvas/main.js";

export default function(e) {
    if (Main.state.toolbar.tool == "worldPoint") {
        Main.canvas.classList.add("cursorCopy");
    }
}