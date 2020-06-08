import terrariaWorldParser from "/../terraria-world-file-js/src/browser/terraria-world-parser.js";
import terrariaWorldSaver from "/../terraria-world-file-js/src/browser/terraria-world-saver.js";

import "/utils/polyfills/polyfill-imageData.js";
import colors, { getTileVariantIndex } from "/utils/dbs/colors.js";
import LAYERS from "/utils/dbs/LAYERS.js";

let world;

self.onmessage = async ({ data }) => {
    try {
        switch(data.action) {

            case "PARSE_WORLD_FILE":
                world = await parse(data.worldFile, data.unsafe, data.unsafeOnlyTiles, data.ignoreBounds);
                postMessage({
                    action: "RETURN_WORLD_OBJECT",
                    worldObject: {
                        ...world,
                        tiles: undefined
                    }
                });
                break;

            case "RENDER_LAYERS_IMAGES":
                const layersImages = render();
                postMessage({
                    action: "RETURN_LAYERS_IMAGES_INCOMING",
                });
                postMessage({
                    action: "RETURN_LAYERS_IMAGES",
                    layersImages
                });
                break;

            case "SAVE_WORLD_FILE":
                const newWorldFile = save({
                    ...data.worldObject,
                    tiles: world.tiles,
                });
                postMessage({
                    action: "RETURN_NEW_WORLD_FILE",
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
    } catch (e) {
        console.error("worker error: ", e)
        postMessage({
            action: "ERROR",
            error: {
                ...e,
                stack: e.stack
            }
        });
    }
}

async function parse(file, unsafe, unsafeOnlyTiles, ignoreBounds) {
    postMessage({
        action: "RETURN_PARSING_PERCENT_INCOMING",
    });

    let world = await new terrariaWorldParser().loadFile(file);
    if (unsafeOnlyTiles) {
        world = world.parse({
            sections: ["tiles", "necessary"],
            ignorePointers: unsafe,
            ignoreBounds,
            progressCallback: (percent) => {
                postMessage({
                    action: "RETURN_PARSING_PERCENT",
                    percent: percent
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
            maxTilesY: world.necessary.height,
        };

        //average calculated on sample of 383 small, 204 medium and 464 large worlds
        if (world.necessary.width == 4200) {
            world.header.worldSurface = 332;
            world.header.rockLayer = 460;
        } else if (world.necessary.width == 6400) {
            world.header.worldSurface = 486;
            world.header.rockLayer = 690;
        } else if (world.necessary.width == 8400) {
            world.header.worldSurface = 620;
            world.header.rockLayer = 911;
        }

        return world;
    } else
        return world.parse({
            ignorePointers: unsafe,
            ignoreBounds,
            progressCallback: (percent) => {
                postMessage({
                    action: "RETURN_PARSING_PERCENT",
                    percent: percent
                });
            }
        });
}

function render() {
    if (!world) {
        throw new Error("worker error: render: no world loaded");
        return;
    }

    let layersImages = [];
    Object.values(LAYERS).forEach(LAYER => {
        layersImages[LAYER] = new ImageData(world.header.maxTilesX, world.header.maxTilesY);
    })

    const bgLayers = {
        space: 80, // below
        // sky - betweens
        ground: world.header.worldSurface, //above
        cavern: world.header.rockLayer, //above
        underworld: world.header.maxTilesY - 192, //above
    };

    postMessage({
        action: "RETURN_RENDERING_PERCENT_INCOMING",
    });


    let position = 0;
    const setPointColor = (LAYER, color) => {
        if (!color) {
            color = {
                r:0,
                g:0,
                b:0,
                a:0
            };
        }
        layersImages[LAYER].data[position]     = color.r;
        layersImages[LAYER].data[position + 1] = color.g;
        layersImages[LAYER].data[position + 2] = color.b;
        layersImages[LAYER].data[position + 3] = color.a;
    }

    let temp = [];

    const drawOnePercent = world.header.maxTilesY / 100;
    let drawPercentNext = 0;
    let drawPercent = 0;
    for (let y = 0; y < world.header.maxTilesY; y++) {
        if (y > drawPercentNext) {
            drawPercentNext += drawOnePercent;
            drawPercent++;
            postMessage({
                action: "RETURN_RENDERING_PERCENT",
                percent: drawPercent
            });
        }

        for (let x = 0; x < world.header.maxTilesX; x++) {
            const tile = world.tiles[x][y];

            if (tile.blockId !== undefined) {
                if (colors[LAYERS.TILES][tile.blockId].r)
                    setPointColor(LAYERS.TILES, colors[LAYERS.TILES][tile.blockId]);
                else {
                    setPointColor(LAYERS.TILES, colors[LAYERS.TILES][tile.blockId][ getTileVariantIndex(tile.blockId, tile.frameX, tile.frameY) ]);
                }
            }

            if (tile.liquid)
                setPointColor(LAYERS.LIQUIDS, colors[LAYERS.LIQUIDS][tile.liquid.type]);

            if (tile.wallId !== undefined) {
                setPointColor(LAYERS.WALLS, colors[LAYERS.WALLS][tile.wallId]);
            }

            if (tile.wiring && tile.wiring.wires) {
                if (tile.wiring.wires.red)
                    setPointColor(LAYERS.WIRES, colors[LAYERS.WIRES]["red"]);
                if (tile.wiring.wires.green)
                    setPointColor(LAYERS.WIRES, colors[LAYERS.WIRES]["green"]);
                if (tile.wiring.wires.blue)
                    setPointColor(LAYERS.WIRES, colors[LAYERS.WIRES]["blue"]);
                if (tile.wiring.wires.yellow)
                    setPointColor(LAYERS.WIRES, colors[LAYERS.WIRES]["yellow"]);
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

            setPointColor(LAYERS.BACKGROUND, color);

            position += 4;
        }
    }

    return layersImages;
}

function save(world) {
    if (!world) {
        throw new Error("web-worker: save: no world loaded");
        return;
    }

    postMessage({
        action: "RETURN_SAVING_PERCENT_INCOMING",
    });

    let file = new terrariaWorldSaver();
    return file.save({
        world,
        progressCallback: (percent) => {
            postMessage({
                action: "RETURN_SAVING_PERCENT",
                percent
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