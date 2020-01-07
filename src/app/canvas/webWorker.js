import terrariaWorldParser from "/../terraria-world-parser/src/browser/terraria-world-parser.js";
import pointColors from "./pointColors.js";
import LAYERS from "./enum-LAYERS.js";
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
                layerImage[LAYERS.LIQUIDS].data[position + 3] = 255;
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
}
