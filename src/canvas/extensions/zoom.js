import Main from "/canvas/main.js";

const center = (x, y) => {
    Main.posX = x - Main.viewWidthTiles/2;
    Main.posY = y - Main.viewHeightTiles/2;
}

export default {
    center,
    in: (center) => {
        const centerX = Main.posX + Main.viewWidthTiles/2,
            centerY = Main.posY + Main.viewHeightTiles/2;

        if (Main.zoomLevel < Main.zoomFactors.length - 1) {
            Main.viewHeightTiles = Main.viewHeightTiles = Main.zoomFactors[++Main.zoomLevel];
            Main.loop.updateViewTiles();
        }

        if (center)
            center(centerX, centerY);
    },
    out: (center) => {
        const centerX = Main.posX + Main.viewWidthTiles/2,
            centerY = Main.posY + Main.viewHeightTiles/2;

        if (Main.zoomLevel > 0) {
            Main.viewHeightTiles = Main.zoomFactors[--Main.zoomLevel];
            Main.loop.updateViewTiles();
        }

        if (center)
            center(centerX, centerY);
    },
    set: (level, center) => {
        const centerX = Main.posX + Main.viewWidthTiles/2,
            centerY = Main.posY + Main.viewHeightTiles/2;

        if (level > 0 && level < Main.zoomFactors.length - 1) {
            Main.viewHeightTiles = Main.zoomFactors[level];
            Main.zoomLevel = level;
            Main.loop.updateViewTiles();
        }

        if (center)
            center(centerX, centerY);
    },
    info: () => ({
        zoomLevel: Main.zoomLevel,
        zoomFactors: Main.zoomFactors
    })
}