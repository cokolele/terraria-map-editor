import Main from "/canvas/main.js";

import { onMoveDragTouch } from "/canvas/tools/move.js";

export default function(e) {
    //[Main.mousePosImageX, Main.mousePosImageY, Main.mousePosElementX, Main.mousePosElementY] = Main.extensions.getMousePosImage(e, true);
    e.preventDefault();

    if (e.touches.length == 1) {
        Main.listeners.moveMomentum = {
            x: e.touches[0].clientX - Main.listeners.lastTouchX,
            y: e.touches[0].clientY - Main.listeners.lastTouchY
        };
        onMoveDragTouch(e);
    }

    //pinch zoom
    else if (e.touches.length > 1) {
        const [prevViewHeightTiles, prevViewWidthTiles] = [Main.viewHeightTiles, Main.viewWidthTiles];

        //zoom
        let pinchDistance = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
        Main.viewHeightTiles -= (pinchDistance - Main.listeners.lastPinchDistance) / Main.tilePixelRatio * 2; // times constant so it doesnt feel slow

        if (Main.viewHeightTiles < 10)
            Main.viewHeightTiles = 10;
        else if (Main.viewHeightTiles > Main.state.canvas.worldObject.header.maxTilesY)
            Main.viewHeightTiles = Main.state.canvas.worldObject.header.maxTilesY;

        //pos corrent
        Main.loop.updateViewTiles();

        Main.listeners.pinchMiddlePos[0] = e.touches[0].clientX > e.touches[1].clientX
            ? e.touches[1].clientX + (e.touches[0].clientX - e.touches[1].clientX) / 2
            : e.touches[0].clientX + (e.touches[1].clientX - e.touches[0].clientX) / 2;
        Main.listeners.pinchMiddlePos[1] = e.touches[0].clientY > e.touches[1].clientY
            ? e.touches[1].clientY + (e.touches[0].clientY - e.touches[1].clientY) / 2
            : e.touches[0].clientY + (e.touches[1].clientY - e.touches[0].clientY) / 2;

        const xNormalized = Main.listeners.pinchMiddlePos[0] / Main.canvas.width;
        const yNormalized = Main.listeners.pinchMiddlePos[1] / Main.canvas.height;
        Main.posX += prevViewWidthTiles * xNormalized - Main.viewWidthTiles * xNormalized;
        Main.posY += prevViewHeightTiles * yNormalized - Main.viewHeightTiles * yNormalized;

        Main.listeners.lastPinchA = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        Main.listeners.lastPinchB = { x: e.touches[1].clientX, y: e.touches[1].clientY };
        Main.listeners.lastPinchDistance = pinchDistance;
    }
}
