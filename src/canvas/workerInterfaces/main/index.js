import parseWorldFile from "/canvas/workerInterfaces/main/parseWorldFile.js";
import renderLayersImages from "/canvas/workerInterfaces/main/renderLayersImages.js";
import saveWorldFile from "/canvas/workerInterfaces/main/saveWorldFile.js";
import verifyWorldFileFormat from "/canvas/workerInterfaces/main/verifyWorldFileFormat.js";
import editTiles from "/canvas/workerInterfaces/main/editTiles.js";
import getTileData from "/canvas/workerInterfaces/main/getTileData.js";
import blockSwap from "/canvas/workerInterfaces/main/blockSwap.js";

export default {
    parseWorldFile,
    renderLayersImages,
    saveWorldFile,
    verifyWorldFileFormat,
    editTiles,
    getTileData,
    blockSwap
}