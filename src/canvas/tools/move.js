import Main from "/canvas/main.js";

const onMoveDrag = (e) => {
    Main.posX -= e.movementX / Main.tilePixelRatio;
    Main.posY -= e.movementY / Main.tilePixelRatio;
}

export {
    onMoveDrag
}