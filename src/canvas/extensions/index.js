import loadMap from "src/canvas/extensions/loadMap.js";
import closeMap from "src/canvas/extensions/closeMap.js";
import { getMousePosElement, getMousePosImage } from "src/canvas/extensions/getMousePos.js";
import getImageUrl from "src/canvas/extensions/getImageUrl.js";
import saveWorldFile from "src/canvas/extensions/saveWorldFile.js";
import { getTileColor } from "src/canvas/extensions/getTileInfo.js";
import blockSwap from "src/canvas/extensions/blockSwap.js";
import blockReplace from "src/canvas/extensions/blockReplace.js";
import zoom from "src/canvas/extensions/zoom.js";

export default {
    loadMap,
    closeMap,
    getMousePosElement,
    getMousePosImage,
    getImageUrl,
    saveWorldFile,
    getTileColor,
    blockSwap,
    blockReplace,
    zoom
}