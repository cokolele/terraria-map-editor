import Main from "/canvas/main.js";
import { map } from "/utils/number.js";

//returns mouse pos of canvas element
function getMousePosElement(e) {
    const rect = e.target.getBoundingClientRect();
    return [
        e.clientX - Math.floor(rect.left),
        e.clientY - Math.floor(rect.top)
    ];
}

//returns image tile position
function getMousePosImage(e, getElPos) {
    let [x, y] = getMousePosElement(e);
    if (getElPos) //some optimalizations, if it already has to compute it why not return in
        return [
            Math.floor(map(x, 0, Main.canvas.width, Main.posX, Main.posX + Main.viewWidthTiles)),
            Math.floor(map(y, 0, Main.canvas.height, Main.posY, Main.posY + Main.viewHeightTiles)),
            x,
            y
        ];
    else
        return [
            Math.floor(map(x, 0, Main.canvas.width, Main.posX, Main.posX + Main.viewWidthTiles)),
            Math.floor(map(y, 0, Main.canvas.height, Main.posY, Main.posY + Main.viewHeightTiles))
        ];
}

export {
    getMousePosElement,
    getMousePosImage
}