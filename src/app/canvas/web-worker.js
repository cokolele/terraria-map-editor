import terrariaWorldParser from "/../terraria-world-parser/src/browser/terraria-world-parser.js";
import tileColors from "/utils/dbs/tile-colors.json";
import LAYERS from "./struct_LAYERS.js";
import "/utils/polyfills/polyfill-imageData.js";

self.onmessage = async ({ data }) => {
    try {
        switch(data.action) {
            case "PARSE_AND_RENDER_MAP_RETURN_WITHOUT_BLOCKS":
                await parse(data.file);
                render();

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
                        fileFormatHeader: world.fileFormatHeader,
                        header: world.header,
                        chests: world.chests,
                        signs: world.signs,
                        NPCs: world.NPCs,
                        tileEntities: world.tileEntities,
                        weightedPressurePlates: world.weightedPressurePlates,
                        townManager: world.townManager
                    }
                });
                break;
        }
    } catch (e) {
        if (e.name == "TerrariaWorldParserError")
            e.message = e.onlyMessage;

        postMessage({
            action: "ERROR",
            error: {
                name: e.name,
                message: e.message
            }
        });
    }
}

let world;
let layerImage = {};

const parse = async (file) => {
    postMessage({
        action: "RETURN_PERCENTAGE_PARSING_INCOMING",
    });
    world = await new terrariaWorldParser().loadFile(file);
    world = await world.parse((percentVal) => {
        postMessage({
            action: "RETURN_PERCENTAGE_PARSING",
            percentage: percentVal
        });
    });
}

const render = () => {
    if (!world) {
        console.error("Web-worker-map-parsing error: no world loaded");
        return;
    }

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
            let pixel = {};
            if (world.worldTiles[x][y].blockId || world.worldTiles[x][y].blockId == 0) {
                pixel.color = tileColors.tiles[world.worldTiles[x][y].blockId];
                pixel.LAYER = LAYERS.TILES;
            }
            else if (world.worldTiles[x][y].liquid) {
                pixel.color = tileColors.liquids[world.worldTiles[x][y].liquid.type];
                pixel.LAYER = LAYERS.TILES;
            }
            else if (world.worldTiles[x][y].wallId) {
                pixel.color = tileColors.walls[world.worldTiles[x][y].wallId];
                pixel.LAYER = LAYERS.WALLS;
            }
            else {
                if (y < bgLayers.space)
                    pixel.color = tileColors.backgrounds.space;
                else if (y >= bgLayers.space && y < bgLayers.ground)
                    pixel.color = tileColors.backgrounds.sky;
                else if (y >= bgLayers.ground && y < bgLayers.cavern)
                    pixel.color = tileColors.backgrounds.ground;
                else if (y >= bgLayers.cavern && y < bgLayers.underworld)
                    pixel.color = tileColors.backgrounds.cavern;
                else if (y >= bgLayers.underworld)
                    pixel.color = tileColors.backgrounds.underworld;

                pixel.LAYER = LAYERS.BACKGROUND;
            }

            layerImage[pixel.LAYER].data[position] = pixel.color.r;
            layerImage[pixel.LAYER].data[position + 1] = pixel.color.g;
            layerImage[pixel.LAYER].data[position + 2] = pixel.color.b;
            layerImage[pixel.LAYER].data[position + 3] = 255;

            position += 4;
        }
    }
}
