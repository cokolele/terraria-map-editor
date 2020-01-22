import terrariaWorldParser from "/../terraria-world-file-js/src/browser/terraria-world-parser.js";
import terrariaWorldSaver from "/../terraria-world-file-js/src/browser/terraria-world-saver.js";
import pointColors from "./pointColors.js";
import LAYERS from "./enum-LAYERS.js";
import "/utils/polyfills/polyfill-imageData.js";

let world;

self.onmessage = async ({ data }) => {
    try {
        switch(data.action) {
            case "PARSE_AND_RENDER_MAP_RETURN_WITHOUT_BLOCKS":
                world = await parse(data.file);
                const layerImage = render();

                postMessage({
                    action: "RETURN_IMAGES_INCOMING",
                });
                postMessage({
                    action: "RETURN_IMAGES",
                    layerImage
                });
                postMessage({
                    action: "RETURN_WORLD_OBJECT_INCOMING",
                });
                postMessage({
                    action: "RETURN_WORLD_OBJECT",
                    world: {
                        ...world,
                        worldTiles: null
                    }
                });
                break;
            case "SAVE_MAP":
                const newWorldFile = save(world);
                postMessage({
                    action: "RETURN_MAP_FILE",
                    newWorldFile
                });
                break;
            case "VERIFY_FILE":
                const valid = await verify(data.file);
                postMessage({
                    action: "RETURN_FILE_VALIDITY",
                    valid
                });
                break;
        }
    } catch (error) {
        postMessage({
            action: "ERROR",
            error: {
                name: error.name,
                message: error.message,
                onlyMessage: error.onlyMessage,
                stack: error.stack
            }
        });
    }
}

async function parse(file) {
    postMessage({
        action: "RETURN_PERCENTAGE_PARSING_INCOMING",
    });

    const world = await new terrariaWorldParser().loadFile(file);
    return world.parse((percentVal) => {
        postMessage({
            action: "RETURN_PERCENTAGE_PARSING",
            percentage: percentVal
        });
    });
}

function render() {
    if (!world) {
        throw new Error("web-worker: save: no world loaded");
        return;
    }

    let layerImage = {};
    Object.values(LAYERS).forEach(LAYER => {
        layerImage[LAYER] = new ImageData(world.header.maxTilesX, world.header.maxTilesY);
    })

    const bgLayers = {
        space: 80, // below
        // sky - betweens
        ground: world.header.worldSurface, //above
        cavern: world.header.rockLayer, //above
        underworld: world.header.maxTilesY - 192, //above
    };

    postMessage({
        action: "RETURN_PERCENTAGE_RENDERING_INCOMING",
    });

    let position = 0;
    const drawPercentil = world.header.maxTilesY / 100;
    let drawPercentilNext = 0;
    let drawPercentage = 0;
    for (let y = 0; y < world.header.maxTilesY; y++) {
        if (y > drawPercentilNext) {
            drawPercentilNext += drawPercentil
            drawPercentage++;
            postMessage({
                action: "RETURN_PERCENTAGE_RENDERING",
                percentage: drawPercentage
            });
        }

        for (let x = 0; x < world.header.maxTilesX; x++) {
            if (world.worldTiles[x][y].blockId !== undefined) {
                const color = pointColors[LAYERS.TILES][world.worldTiles[x][y].blockId];

                layerImage[LAYERS.TILES].data[position] = color.r;
                layerImage[LAYERS.TILES].data[position + 1] = color.g;
                layerImage[LAYERS.TILES].data[position + 2] = color.b;
                layerImage[LAYERS.TILES].data[position + 3] = 255;
            }

            if (world.worldTiles[x][y].liquid !== undefined) {
                const color = pointColors[LAYERS.LIQUIDS][world.worldTiles[x][y].liquid.type];

                layerImage[LAYERS.LIQUIDS].data[position] = color.r;
                layerImage[LAYERS.LIQUIDS].data[position + 1] = color.g;
                layerImage[LAYERS.LIQUIDS].data[position + 2] = color.b;
                layerImage[LAYERS.LIQUIDS].data[position + 3] = 155;
            }

            if (world.worldTiles[x][y].wallId !== undefined) {
                const color = pointColors[LAYERS.WALLS][world.worldTiles[x][y].wallId];

                layerImage[LAYERS.WALLS].data[position] = color.r;
                layerImage[LAYERS.WALLS].data[position + 1] = color.g;
                layerImage[LAYERS.WALLS].data[position + 2] = color.b;
                layerImage[LAYERS.WALLS].data[position + 3] = 255;
            }

            let color;
            if (y < bgLayers.space)
                color = pointColors[LAYERS.BACKGROUND].space;
            else if (y >= bgLayers.space && y < bgLayers.ground)
                color = pointColors[LAYERS.BACKGROUND].sky;
            else if (y >= bgLayers.ground && y < bgLayers.cavern)
                color = pointColors[LAYERS.BACKGROUND].ground;
            else if (y >= bgLayers.cavern && y < bgLayers.underworld)
                color = pointColors[LAYERS.BACKGROUND].cavern;
            else if (y >= bgLayers.underworld)
                color = pointColors[LAYERS.BACKGROUND].underworld;

            layerImage[LAYERS.BACKGROUND].data[position] = color.r;
            layerImage[LAYERS.BACKGROUND].data[position + 1] = color.g;
            layerImage[LAYERS.BACKGROUND].data[position + 2] = color.b;
            layerImage[LAYERS.BACKGROUND].data[position + 3] = 255;

            position += 4;
        }
    }

    return layerImage;
}

function save(world) {
    if (!world) {
        throw new Error("web-worker: save: no world loaded");
        return;
    }

    let file = new terrariaWorldSaver(world);
    return file.save((percentage) => {
        postMessage({
            action: "RETURN_PERCENTAGE_SAVING",
            percentage
        });
    });
}

async function verify(file) {
    try {
        const world = await new terrariaWorldParser().loadFile(file);
        world.parse(["fileformatheader", "footer"]);
    } catch(e) {
        if (e.name == "TerrariaWorldParserError")
            return false;
        else
            throw e;
    }

    return true;
}