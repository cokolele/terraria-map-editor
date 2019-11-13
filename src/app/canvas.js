import store from "/state/store.js";
import { changePercentage, changeDescription } from "/state/modules/status.js";

import terrariaWorldParser from "/../terraria-world-parser/src/browser/terraria-world-parser.js";
import tileColors from "/utils/tile-colors.json";

let worldFile;
let canvasEl, ctx;
let running = false;

let previousValue;
store.subscribe(() => {
    const value = store.getState().menu.file;

    if (value === null) {
        previousValue = null;
        worldFile = null;
        running = false;
    }
    else if (value instanceof File) {
        if (previousValue == undefined || (previousValue.name !== value.name && previousValue.size !== value.size && previousValue.lastModified !== value.lastModified)) {
            previousValue = value;
            worldFile = value;
            start();
        }
    }
});

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
}

const init = (_canvasEl) => {
    canvasEl = _canvasEl;
    ctx = canvasEl.getContext("2d");
}

const start = async () => {
    let world = await new terrariaWorldParser().loadFile(worldFile);
    world = world.parse(["header", "worldtiles"], (percentVal) => {
        store.dispatch(changePercentage(percentVal));
    });

    const layers = {
        space: 80, // below
        // sky - betweens
        ground: world.header.worldSurface, //above
        cavern: world.header.rockLayer, //above
        underworld: world.header.maxTilesY - 192, //above
    };

    let img = ctx.createImageData(world.header.maxTilesX, world.header.maxTilesY);

    let position = 0;
    const drawPercentil = world.header.maxTilesY / 100;
    let drawPercentilNext = 0;
    let drawPercentage = 0;
    for (let y = 0; y < world.header.maxTilesY; y++) {
        if (y > drawPercentilNext) {
            drawPercentilNext += drawPercentil
            drawPercentage++;
            //console.log(drawPercentage);
        }

        for (let x = 0; x < world.header.maxTilesX; x++) {

            let color;
            if (world.worldTiles[x][y].blockId || world.worldTiles[x][y].blockId == 0)  color = tileColors.tiles[world.worldTiles[x][y].blockId];
            else if (world.worldTiles[x][y].liquid)                                     color = tileColors.liquids[world.worldTiles[x][y].liquid.type];
            else if (world.worldTiles[x][y].wallId)                                     color = tileColors.walls[world.worldTiles[x][y].wallId];
            else {
                if (y < layers.space)                                                   color = tileColors.backgrounds.space;
                else if (y >= layers.space && y < layers.ground)                        color = tileColors.backgrounds.sky;
                else if (y >= layers.ground && y < layers.cavern)                       color = tileColors.backgrounds.ground;
                else if (y >= layers.cavern && y < layers.underworld)                   color = tileColors.backgrounds.cavern;
                else if (y >= layers.underworld)                                        color = tileColors.backgrounds.underworld;
            }

            img.data[position + 0] = color.red;
            img.data[position + 1] = color.green;
            img.data[position + 2] = color.blue;
            img.data[position + 3] = color.alpha;

            position += 4;
        }
    }

    ctx.putImageData( img, 0, 0 );

    //running = true;
    //tick(0);
}

const tick = async (T) => {


    if (running)
        requestAnimationFrame(tick, canvasEl);
}

export default init;