import Main from "/canvas/main.js";

export default function(e) {
    Main.listeners.noTouches = false;
    if (e.touches.length == 1) {
        Main.listeners.lastTouchX = e.touches[0].clientX;
        Main.listeners.lastTouchY = e.touches[0].clientY;
    } else if (e.touches.length == 2) {
        Main.listeners.lastPinchA = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        Main.listeners.lastPinchB = { x: e.touches[1].clientX, y: e.touches[1].clientY };
        Main.listeners.lastPinchDistance = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
        Main.listeners.pinchMiddlePos = [];
    }
}