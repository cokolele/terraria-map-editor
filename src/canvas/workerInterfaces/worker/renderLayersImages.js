import Worker from "/canvas/worker.js";

import "/utils/polyfills/polyfill-imageData.js";
import colors, { getTileVariantIndex } from "/utils/dbs/colors.js";
import LAYERS from "/utils/dbs/LAYERS.js";
import paints from "/utils/dbs/paints.js";

import { map } from "/utils/number.js";

export default async function() {
    if (!Worker.worldObject) {
        throw new Error("worker error: render: no world loaded");
        return;
    }

    let layersImages = [];
    Object.values(LAYERS).forEach(LAYER => {
        layersImages[LAYER] = new ImageData(Worker.worldObject.header.maxTilesX, Worker.worldObject.header.maxTilesY);
    })

    const bgLayers = {
        ground: Worker.worldObject.header.worldSurface,
        cavern: Worker.worldObject.header.rockLayer,
        underworld: Worker.worldObject.header.maxTilesY - 200
    };

    let position = 0;
    function setPointColor(LAYER, color) {
        if (!color)
            color = { r:0, g:0, b:0, a:0 };

        layersImages[LAYER].data[position]     = color.r;
        layersImages[LAYER].data[position + 1] = color.g;
        layersImages[LAYER].data[position + 2] = color.b;
        layersImages[LAYER].data[position + 3] = color.a;
    }

    function paintTile(tileLAYER, tileId, paintId) {
        const baseColor = colors[tileLAYER][tileId] ?? {r:0,g:0,b:0,a:0};

        if (paintId == 30) {
            if (tileLAYER == LAYERS.TILES) {
                return {
                    r: 255 - baseColor.r,
                    g: 255 - baseColor.g,
                    b: 255 - baseColor.b,
                    a: baseColor.a
                }
            } else {
                return {
                    r: Math.floor((255 - baseColor.r) * 0.5),
                    g: Math.floor((255 - baseColor.g) * 0.5),
                    b: Math.floor((255 - baseColor.b) * 0.5),
                    a: baseColor.a
                }
            }
        }

        const baseColorNormalized = {
            r: baseColor.r / 255,
            g: baseColor.g / 255,
            b: baseColor.b / 255
        }

        if (baseColorNormalized.g > baseColorNormalized.r)
            [baseColorNormalized.r, baseColorNormalized.g] = [baseColorNormalized.g, baseColorNormalized.r];

        if (baseColorNormalized.b > baseColorNormalized.r)
            [baseColorNormalized.r, baseColorNormalized.b] = [baseColorNormalized.b, baseColorNormalized.r];

        if (paintId == 29) {
            const blueModifier = baseColorNormalized.b * 0.3;
            return {
                r: Math.floor(paints[paintId].color.r * blueModifier),
                g: Math.floor(paints[paintId].color.g * blueModifier),
                b: Math.floor(paints[paintId].color.b * blueModifier),
                a: baseColor.a
            }
        }

        const redModifier = baseColorNormalized.r;
        return {
            r: Math.floor(paints[paintId].color.r * redModifier),
            g: Math.floor(paints[paintId].color.g * redModifier),
            b: Math.floor(paints[paintId].color.b * redModifier),
            a: baseColor.a
        }
    }

    const snowTiles = [147, 161, 162, 163, 163, 200];
    function checkSnowGradient(colorCache) {

    }

    postMessage({
        action: "RETURN_RENDERING_PERCENT_INCOMING",
    });

    const drawOnePercent = Worker.worldObject.header.maxTilesY / 100;
    let drawPercentNext = 0;
    let drawPercent = 0;
    for (let y = 0; y < Worker.worldObject.header.maxTilesY; y++) {
        if (y > drawPercentNext) {
            drawPercentNext += drawOnePercent;
            drawPercent++;
            postMessage({
                action: "RETURN_RENDERING_PERCENT",
                percent: drawPercent
            });
        }

        let backgroundColumnCache = [];

        for (let x = 0; x < Worker.worldObject.header.maxTilesX; x++) {
            const tile = Worker.worldObject.tiles[x][y];

            if (tile.blockId !== undefined && colors[LAYERS.TILES][tile.blockId]) {
                if (colors[LAYERS.TILES][tile.blockId].r !== undefined)
                    setPointColor(LAYERS.TILES, colors[LAYERS.TILES][tile.blockId]);
                else
                    setPointColor(LAYERS.TILES, colors[LAYERS.TILES][tile.blockId][ getTileVariantIndex(tile.blockId, tile.frameX, tile.frameY, x, y) ]);
            }

            if (tile.blockColor !== undefined && tile.blockColor != 31 && colors[LAYERS.TILES][tile.blockId])
                setPointColor(LAYERS["Painted Tiles"], paintTile(LAYERS.TILES, tile.blockId, tile.blockColor));

            if (tile.liquidType)
                setPointColor(LAYERS.LIQUIDS, colors[LAYERS.LIQUIDS][tile.liquidType]);

            if (tile.wallId !== undefined && colors[LAYERS.WALLS][tile.wallId])
                setPointColor(LAYERS.WALLS, colors[LAYERS.WALLS][tile.wallId]);

            if (tile.wallColor !== undefined && tile.wallColor != 31 && colors[LAYERS.WALLS][tile.wallId])
                setPointColor(LAYERS["Painted Walls"], paintTile(LAYERS.WALLS, tile.wallId, tile.wallColor));

            if (tile.wireRed)
                setPointColor(LAYERS.WIRES, colors[LAYERS.WIRES]["red"]);
            if (tile.wireGreen)
                setPointColor(LAYERS.WIRES, colors[LAYERS.WIRES]["green"]);
            if (tile.wireBlue)
                setPointColor(LAYERS.WIRES, colors[LAYERS.WIRES]["blue"]);
            if (tile.wireYellow)
                setPointColor(LAYERS.WIRES, colors[LAYERS.WIRES]["yellow"]);

            if (x == 0) {
                if (y < bgLayers.ground) {
                    const gradientPercent = map(y, 0, bgLayers.ground, 0, 1);
                    backgroundColumnCache[y] = {
                        r: colors[LAYERS.BACKGROUND].skyGradient[0].r + gradientPercent * (colors[LAYERS.BACKGROUND].skyGradient[1].r - colors[LAYERS.BACKGROUND].skyGradient[0].r),
                        g: colors[LAYERS.BACKGROUND].skyGradient[0].g + gradientPercent * (colors[LAYERS.BACKGROUND].skyGradient[1].g - colors[LAYERS.BACKGROUND].skyGradient[0].g),
                        b: colors[LAYERS.BACKGROUND].skyGradient[0].b + gradientPercent * (colors[LAYERS.BACKGROUND].skyGradient[1].b - colors[LAYERS.BACKGROUND].skyGradient[0].b),
                        a: 255
                    };
                }
                else if (y >= bgLayers.ground && y < bgLayers.cavern)
                    backgroundColumnCache[y] = colors[LAYERS.BACKGROUND].ground;
                else if (y >= bgLayers.cavern && y < bgLayers.underworld)
                    backgroundColumnCache[y] = colors[LAYERS.BACKGROUND].cavern;
                else if (y >= bgLayers.underworld)
                    backgroundColumnCache[y] = colors[LAYERS.BACKGROUND].underworld;
            }

            setPointColor(LAYERS.BACKGROUND, backgroundColumnCache[y]);
            /*
            if (y < bgLayers.ground || y >= bgLayers.underworld)

            else
                setPointColor(LAYERS.BACKGROUND, checkSnowGradient(backgroundColumnCache[y]));
            */

            position += 4;
        }
    }

    postMessage({
        action: "RETURN_LAYERS_IMAGES_INCOMING",
    });

    postMessage({
        action: "RETURN_LAYERS_IMAGES",
        layersImages
    });
}