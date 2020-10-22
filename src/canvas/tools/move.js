import Main from "/canvas/main.js";

const onMoveDrag = (e) => {
    Main.posX -= e.movementX / Main.tilePixelRatio;
    Main.posY -= e.movementY / Main.tilePixelRatio;
};

const onMoveDragTouch = (e) => {
    Main.posX -= (e.touches[0].clientX - Main.listeners.lastTouchX) / Main.tilePixelRatio;
    Main.posY -= (e.touches[0].clientY - Main.listeners.lastTouchY) / Main.tilePixelRatio;

    Main.listeners.lastTouchX = e.touches[0].clientX;
    Main.listeners.lastTouchY = e.touches[0].clientY;
};

export {
    onMoveDrag,
    onMoveDragTouch
}