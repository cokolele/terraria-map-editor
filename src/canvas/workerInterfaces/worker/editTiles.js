import Worker from "/canvas/worker.js";

import colors, { getTileVariantIndex } from "/utils/dbs/colors.js";
import LAYERS from "/utils/dbs/LAYERS.js";

function changeTile(LAYER, x, y, newId) {
    //original 2d tiles array is full of references because of RLE, dont wanna change them too!
    Worker.worldObject.tiles[x][y] = { ...Worker.worldObject.tiles[x][y] };

    if (newId == "delete") {
        switch(LAYER) {
            case LAYERS.TILES:
                delete Worker.worldObject.tiles[x][y].blockId;
                delete Worker.worldObject.tiles[x][y].frameX;
                delete Worker.worldObject.tiles[x][y].frameY;
                delete Worker.worldObject.tiles[x][y].slope;
                delete Worker.worldObject.tiles[x][y].blockColor;
                break;

            case LAYERS.WALLS:
                delete Worker.worldObject.tiles[x][y].wallId;
                delete Worker.worldObject.tiles[x][y].wallColor;
                break;

            case LAYERS.WIRES:
                delete Worker.worldObject.tiles[x][y].wireRed;
                delete Worker.worldObject.tiles[x][y].wireGreen;
                delete Worker.worldObject.tiles[x][y].wireBlue;
                delete Worker.worldObject.tiles[x][y].wireYellow;
                delete Worker.worldObject.tiles[x][y].actuator;
                delete Worker.worldObject.tiles[x][y].actuated;
                break;

            case LAYERS.LIQUIDS:
                delete Worker.worldObject.tiles[x][y].liquidType;
                delete Worker.worldObject.tiles[x][y].liquidAmount;
                break;
        }
    } else {
        switch(LAYER) {
            case LAYERS.TILES:
                Worker.worldObject.tiles[x][y].blockId = parseInt(newId);
                delete Worker.worldObject.tiles[x][y].frameX;
                delete Worker.worldObject.tiles[x][y].frameY;
                delete Worker.worldObject.tiles[x][y].slope;
                delete Worker.worldObject.tiles[x][y].blockColor;
                break;

            case LAYERS.WALLS:
                Worker.worldObject.tiles[x][y].wallId = parseInt(newId);
                delete Worker.worldObject.tiles[x][y].wallColor;
                break;

            case LAYERS.WIRES:
                Worker.worldObject.tiles[x][y]["wire" + newId.charAt(0).toUpperCase() + newId.slice(1)] = true;
                break;

            case LAYERS.LIQUIDS:
                Worker.worldObject.tiles[x][y].liquidType = newId;
                Worker.worldObject.tiles[x][y].liquidAmount = 255;
                break;
        }
    }
}

export default function({ LAYER, editType, editArgs, newId }) {
    if (editType == "rectangle") {
        for (let x = editArgs[0][0]; x <= editArgs[1][0]; x++)
            for (let y = editArgs[0][1]; y <= editArgs[1][1]; y++)
                changeTile(LAYER, x, y, newId);

        postMessage({
            action: "RETURN_EDIT_TILES"
        });
    }

    /*
    else if (editType == "floodfill") {
        //fourway flood fill
        const x = editArgs[0],
            y = editArgs[1];
        let boundary;
        switch(LAYER) {
            case LAYERS.TILES:
                boundary = Worker.worldObject.tiles[x][y].blockId;
                break;
            case LAYERS.WALLS:
                boundary = Worker.worldObject.tiles[x][y].wallId;
                break;
            case LAYERS.WIRES:
                boundary = (Worker.worldObject.tiles[x][y].wiring && Worker.worldObject.tiles[x][y].wiring.wires) ? Worker.worldObject.tiles[x][y].wiring.wires : undefined;
                break;
            case LAYERS.LIQUIDS:
                boundary = Worker.worldObject.tiles[x][y].liquid ? Worker.worldObject.tiles[x][y].liquid.type : undefined;
                break;
        };

        if (boundary == newId || (LAYER == LAYERS.WIRES && boundary && boundary[newId])) {
            postMessage({
                action: "RETURN_EDIT_TILES"
            });
            console.log("same");
            return;
        }

        let alreadyChecked = [];
        let tilesArray = [];
        let tilesArrayBuffer = [[x, y]];
        let current;

        while (tilesArrayBuffer.length) {
            const [x, y] = tilesArrayBuffer.pop();

            if (alreadyChecked.includes(x + y))
                continue;

            switch(LAYER) {
                case LAYERS.TILES:
                    current = Worker.worldObject.tiles[x][y].blockId;
                    break;
                case LAYERS.WALLS:
                    current = Worker.worldObject.tiles[x][y].wallId;
                    break;
                case LAYERS.WIRES:
                    current = (Worker.worldObject.tiles[x][y].wiring && Worker.worldObject.tiles[x][y].wiring.wires) ? Worker.worldObject.tiles[x][y].wiring.wires : undefined;
                    break;
                case LAYERS.LIQUIDS:
                    current = Worker.worldObject.tiles[x][y].liquid ? Worker.worldObject.tiles[x][y].liquid.type : undefined;
                    break;
            };

            if (current == boundary || (LAYER == LAYERS.WIRES && JSON.stringify(current) === JSON.stringify(boundary))) {
                changeTile(LAYER, x, y, newId);
                tilesArray.push(x, y);
                tilesArrayBuffer.push([x, y+1], [x+1, y], [x, y-1], [x-1, y]);
            }

            alreadyChecked.push(x + y);
        }

        console.log(tilesArray);

        postMessage({
            action: "RETURN_EDIT_TILES",
            tilesArray
        });
    }*/
}