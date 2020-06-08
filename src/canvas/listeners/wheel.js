import Main from "/canvas/main.js";

export default function(e) {
    e.preventDefault();

    const [prevViewHeightTiles, prevViewWidthTiles] = [Main.viewHeightTiles, Main.viewWidthTiles];
    const xNormalized = Main.mousePosElementX / Main.canvas.width;
    const yNormalized = Main.mousePosElementY / Main.canvas.height;

    if (e.deltaY < 0 && Main.zoomLevel < Main.zoomFactors.length - 1)
        Main.viewHeightTiles = Main.zoomFactors[++Main.zoomLevel];
    else if (e.deltaY > 0 && Main.zoomLevel > 0)
        Main.viewHeightTiles = Main.zoomFactors[--Main.zoomLevel];
    else
        return;

    Main.loop.updateViewTiles();

    Main.posX += prevViewWidthTiles * xNormalized - Main.viewWidthTiles * xNormalized;
    Main.posY += prevViewHeightTiles * yNormalized - Main.viewHeightTiles * yNormalized;
}