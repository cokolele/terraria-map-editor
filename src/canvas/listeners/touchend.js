import Main from "/canvas/main.js";

export default function(e) {
    if (e.touches.length == 0) {
        Main.listeners.noTouches = true;
        delete Main.listeners.lastTouchX;
        delete Main.listeners.lastTouchY;
    }
    else if (e.touches.length == 1) {
        Main.listeners.lastTouchX = e.touches[0].clientX;
        Main.listeners.lastTouchY = e.touches[0].clientY;
        delete Main.listeners.lastPinchA;
        delete Main.listeners.lastPinchB;
        delete Main.listeners.lastPinchDistance;
        delete Main.listeners.pinchMiddlePos;
    }
}