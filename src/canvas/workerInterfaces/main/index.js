import parseWorldFile from "src/canvas/workerInterfaces/main/parseWorldFile.js";
import renderLayersImages from "src/canvas/workerInterfaces/main/renderLayersImages.js";
import saveWorldFile from "src/canvas/workerInterfaces/main/saveWorldFile.js";
import verifyWorldFileFormat from "src/canvas/workerInterfaces/main/verifyWorldFileFormat.js";
import editTiles from "src/canvas/workerInterfaces/main/editTiles.js";
import getTileData from "src/canvas/workerInterfaces/main/getTileData.js";
import blockSwap from "src/canvas/workerInterfaces/main/blockSwap.js";
import blockReplace from "src/canvas/workerInterfaces/main/blockReplace.js";

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