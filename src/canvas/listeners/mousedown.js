import Main from "/canvas/main.js";

export default function(e) {
    if (e.buttons == 4 || (e.buttons == 1 && Main.state.toolbar.tool == "move"))
        Main.canvas.classList.add("cursorGrabbed");
}