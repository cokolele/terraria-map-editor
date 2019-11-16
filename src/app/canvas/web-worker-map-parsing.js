import terrariaWorldParser from "/../terraria-world-parser/src/browser/terraria-world-parser.js";
import tileColors from "/utils/tile-colors.json";

self.onmessage = async ({ data }) => {
    switch(data.action) {
        case "PARSE_MAP":
            parse(data.file, true);
            break;
        case "RENDER_MAP":
            render(data.image, true)
            break;
        case "PARSE_AND_RENDER_MAP":
            await parse(data.file, false);
            render(new ImageData(world.header.maxTilesX, world.header.maxTilesY), false);
            postMessage({
                action: "RETURN_IMAGE_INCOMING",
            });
            postMessage({
                action: "RETURN_IMAGE",
                image
            });
            postMessage({
                action: "RETURN_PARSED_MAP_INCOMING",
            });
            postMessage({
                action: "RETURN_PARSED_MAP",
                world
            });
            break;
    }
}

let world;
let image;

const parse = async (file, _return) => {
    postMessage({
        action: "RETURN_PERCENTAGE_PARSING_INCOMING",
    });
    world = await new terrariaWorldParser().loadFile(file);
    world = await world.parse(["header", "worldtiles"], (percentVal) => {
        postMessage({
            action: "RETURN_PERCENTAGE_PARSING",
            percentage: percentVal
        });
    });

    if (_return) {
        postMessage({
            action: "RETURN_PARSED_MAP_INCOMING",
        });
        postMessage({
            action: "RETURN_PARSED_MAP",
            world
        });
    }
}

const render = (_image, _return) => {
    if (!world) {
        console.error("Web-worker-map-parsing error: no world loaded");
        return;
    }

    image = _image;

    const layers = {
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

            image.data[position + 0] = color.red;
            image.data[position + 1] = color.green;
            image.data[position + 2] = color.blue;
            image.data[position + 3] = color.alpha;

            position += 4;

        }
    }

    if (_return) {
        postMessage({
            action: "RETURN_IMAGE_INCOMING",
        });
        postMessage({
            action: "RETURN_IMAGE",
            image
        });
    }
}