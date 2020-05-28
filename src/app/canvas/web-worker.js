import terrariaWorldParser from "/../terraria-world-file-js/src/browser/terraria-world-parser.js";
import terrariaWorldSaver from "/../terraria-world-file-js/src/browser/terraria-world-saver.js";

import "/utils/polyfills/polyfill-imageData.js";
import colors from "/utils/dbs/colors.js";
import LAYERS from "/utils/dbs/LAYERS.js";

let world;

self.onmessage = async ({ data }) => {
    try {
        switch(data.action) {
            case "PARSE_AND_RENDER_MAP_RETURN_WITHOUT_BLOCKS":
                world = await parse(data.file, data.unsafe, data.unsafeOnlyTiles, data.ignoreBounds);
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
                        tiles: null
                    }
                });
                break;
            case "SAVE_MAP":
                const newWorldFile = save({
                    ...data.worldObject,
                    tiles: world.tiles,
                });
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
            case "SAVE_TILES_RECTANGLE_CHANGE":
                saveTilesRectangleChange(data.LAYER, data.id, data.point1, data.point2);
                break;
            case "SAVE_TILES_ARRAY_CHANGE":
                saveTilesArrayChange(data.LAYER, data.id, data.tilesArray);
                break;
            case "_DEBUG_GET_TILE_INFO":
                postMessage({
                    action: "_DEBUG_RETURN_TILE_INFO",
                    tile: world.tiles[data.x][data.y]
                })
                break;
        }
    } catch (error) {
        postMessage({
            action: "ERROR",
            error: {
                ...error,
                stack: error.stack
            }
        });
    }
}

async function parse(file, unsafe, unsafeOnlyTiles, ignoreBounds) {
    postMessage({
        action: "RETURN_PERCENTAGE_PARSING_INCOMING",
    });

    let world = await new terrariaWorldParser().loadFile(file);
    if (unsafeOnlyTiles) {
        world = world.parse({
            sections: ["tiles", "necessary"],
            ignorePointers: unsafe,
            ignoreBounds,
            progressCallback: (percentVal) => {
                postMessage({
                    action: "RETURN_PERCENTAGE_PARSING",
                    percentage: percentVal
                });
            }
        });
        world.fileFormatHeader = {
            version: world.necessary.version,
            pointers: world.necessary.pointers,
            importants: world.necessary.importants
        };
        world.header = {
            maxTilesX: world.necessary.width,
            maxTilesY: world.necessary.height
        };

        return world;
    } else
        return world.parse({
            ignorePointers: unsafe,
            ignoreBounds,
            progressCallback: (percentVal) => {
                postMessage({
                    action: "RETURN_PERCENTAGE_PARSING",
                    percentage: percentVal
                });
            }
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
    const setLayerTileColor = (LAYER, color) => {
        if (!color) {
            color = {
                r:0,
                g:0,
                b:0,
                a:0
            };
        }
        layerImage[LAYER].data[position]     = color.r;
        layerImage[LAYER].data[position + 1] = color.g;
        layerImage[LAYER].data[position + 2] = color.b;
        layerImage[LAYER].data[position + 3] = color.a;
    }

    let temp = [];

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
            const tile = world.tiles[x][y];

            if (tile.blockId !== undefined)
                setLayerTileColor(LAYERS.TILES, colors[LAYERS.TILES][tile.blockId]);

            if (tile.liquid)
                setLayerTileColor(LAYERS.LIQUIDS, colors[LAYERS.LIQUIDS][tile.liquid.type]);

            if (tile.wallId !== undefined) {
                setLayerTileColor(LAYERS.WALLS, colors[LAYERS.WALLS][tile.wallId]);
            }

            if (tile.wiring && tile.wiring.wires) {
                if (tile.wiring.wires.red)
                    setLayerTileColor(LAYERS.WIRES, colors[LAYERS.WIRES]["red"]);
                if (tile.wiring.wires.green)
                    setLayerTileColor(LAYERS.WIRES, colors[LAYERS.WIRES]["green"]);
                if (tile.wiring.wires.blue)
                    setLayerTileColor(LAYERS.WIRES, colors[LAYERS.WIRES]["blue"]);
                if (tile.wiring.wires.yellow)
                    setLayerTileColor(LAYERS.WIRES, colors[LAYERS.WIRES]["yellow"]);
            }

            let color;
            if (y < bgLayers.space)
                color = colors[LAYERS.BACKGROUND].space;
            else if (y >= bgLayers.space && y < bgLayers.ground)
                color = colors[LAYERS.BACKGROUND].sky;
            else if (y >= bgLayers.ground && y < bgLayers.cavern)
                color = colors[LAYERS.BACKGROUND].ground;
            else if (y >= bgLayers.cavern && y < bgLayers.underworld)
                color = colors[LAYERS.BACKGROUND].cavern;
            else if (y >= bgLayers.underworld)
                color = colors[LAYERS.BACKGROUND].underworld;

            setLayerTileColor(LAYERS.BACKGROUND, color);

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

    let file = new terrariaWorldSaver();
    return file.save({
        world,
        progressCallback: (percentage) => {
            postMessage({
                action: "RETURN_PERCENTAGE_SAVING",
                percentage
            });
        }
    });
}

async function verify(file) {
    try {
        (await new terrariaWorldParser().loadFile(file)).parse({
            sections: ["fileFormatHeader", "footer"]
        });
    } catch(e) {
        return e;
    }

    return true;
}

function saveTileChange(x, y, properties) {
    world.tiles[x][y] = { ...world.tiles[x][y] };

    if (properties.delete) {
        switch(properties.LAYER) {
            case LAYERS.TILES:
                delete world.tiles[x][y].blockId;
                delete world.tiles[x][y].frameX;
                delete world.tiles[x][y].frameY;
                delete world.tiles[x][y].slope;
                if (world.tiles[x][y].colors)
                    delete world.tiles[x][y].colors.block;
                break;
            case LAYERS.WALLS:
                delete world.tiles[x][y].wallId;
                if (world.tiles[x][y].colors)
                    delete world.tiles[x][y].colors.wall;
                break;
            case LAYERS.WIRES:
                delete world.tiles[x][y].wiring;
                break;
            case LAYERS.LIQUIDS:
                delete world.tiles[x][y].liquid;
                break;
        }
        return;
    }

    if (properties.blockId !== undefined) {
        world.tiles[x][y].blockId = properties.blockId;
        delete world.tiles[x][y].frameX;
        delete world.tiles[x][y].frameY;
        delete world.tiles[x][y].slope;
        if (world.tiles[x][y].colors)
            delete world.tiles[x][y].colors.block;
    }

    if (properties.wallId !== undefined) {
        world.tiles[x][y].wallId = properties.wallId;
        if (world.tiles[x][y].colors)
            delete world.tiles[x][y].colors.wall;
    }

    if (properties.liquid)
        world.tiles[x][y].liquid = properties.liquid;

    if (world.tiles[x][y].wiring && properties.wiring) {
        if (world.tiles[x][y].wiring.wires && properties.wiring.wires)
            properties.wiring.wires = { ...world.tiles[x][y].wiring.wires, ...properties.wiring.wires };

        world.tiles[x][y].wiring = { ...world.tiles[x][y].wiring, ...properties.wiring };
    } else if (properties.wiring)
        world.tiles[x][y].wiring = properties.wiring;
}

function saveTilesRectangleChange(LAYER, id, point1, point2) {
    if (id === null) {
        for (let y = point1[1]; y < point2[1]; y++)
            for (let x = point1[0]; x < point2[0]; x++)
                saveTileChange(x, y, { delete: true, LAYER: LAYER });
    } else {
        switch(LAYER) {
            case LAYERS.TILES:
                for (let y = point1[1]; y < point2[1]; y++)
                    for (let x = point1[0]; x < point2[0]; x++)
                        saveTileChange(x, y, { blockId: id });
                break;
            case LAYERS.WALLS:
                for (let y = point1[1]; y < point2[1]; y++)
                    for (let x = point1[0]; x < point2[0]; x++)
                        saveTileChange(x, y, { wallId: id });
                break;
            case LAYERS.WIRES:
                let temp0;
                for (let y = point1[1]; y < point2[1]; y++)
                    for (let x = point1[0]; x < point2[0]; x++) {
                        temp0 = {};
                        temp0[id] = true;
                        saveTileChange(x, y, { wiring: { wires: temp0 }});
                    }
                break;
            case LAYERS.LIQUIDS:
                for (let y = point1[1]; y < point2[1]; y++)
                    for (let x = point1[0]; x < point2[0]; x++)
                        saveTileChange(x, y, { liquid: { type: id, amount: 255 } });
                break;
        }
    }
}

function saveTilesArrayChange(LAYER, id, tilesArray) {
    switch(LAYER) {
        case LAYERS.TILES:
            tilesArray.forEach(([x, y]) => {
                saveTileChange(x, y, { blockId: id });
            });
            break;
        case LAYERS.WALLS:
            tilesArray.forEach(([x, y]) => {
                saveTileChange(x, y, { wallId: id });
            });
            break;
        case LAYERS.WIRES:
            let temp0;
            tilesArray.forEach(([x, y]) => {
                temp0 = {};
                temp0[id] = true;
                saveTileChange(x, y, { wiring: { wires: temp0 }});
            });
            break;
        case LAYERS.LIQUIDS:
            tilesArray.forEach(([x, y]) => {
                saveTileChange(x, y, { liquid: { type: id, amount: 255 } });
            });
            break;
    }
}