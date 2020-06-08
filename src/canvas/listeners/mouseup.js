import Main from "/canvas/main.js";

export default function(e) {
    Main.listeners.mouseDown = false
    Main.listeners.deltaX = 0;
    Main.listeners.deltaY = 0;
    Main.listeners.prevDragX = null;
    Main.listeners.prevDragY = null;
    Main.canvas.classList.remove("grabbed");
}