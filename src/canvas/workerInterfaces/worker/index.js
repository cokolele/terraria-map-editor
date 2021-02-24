import parseWorldFile from "src/canvas/workerInterfaces/worker/parseWorldFile.js";
import renderLayersImages from "src/canvas/workerInterfaces/worker/renderLayersImages.js";
import saveWorldFile from "src/canvas/workerInterfaces/worker/saveWorldFile.js";
import verifyWorldFileFormat from "src/canvas/workerInterfaces/worker/verifyWorldFileFormat.js";
import editTiles from "src/canvas/workerInterfaces/worker/editTiles.js";
import getTileData from "src/canvas/workerInterfaces/worker/getTileData.js";
import blockSwap from "src/canvas/workerInterfaces/worker/blockSwap.js";
import blockReplace from "src/canvas/workerInterfaces/worker/blockReplace.js";

export default {
    parseWorldFile,
    renderLayersImages,
    saveWorldFile,
    verifyWorldFileFormat,
    editTiles,
    getTileData,
    blockSwap,
    blockReplace
}