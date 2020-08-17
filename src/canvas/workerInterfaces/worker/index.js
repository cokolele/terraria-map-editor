import parseWorldFile from "/canvas/workerInterfaces/worker/parseWorldFile.js";
import renderLayersImages from "/canvas/workerInterfaces/worker/renderLayersImages.js";
import saveWorldFile from "/canvas/workerInterfaces/worker/saveWorldFile.js";
import verifyWorldFileFormat from "/canvas/workerInterfaces/worker/verifyWorldFileFormat.js";
import editTiles from "/canvas/workerInterfaces/worker/editTiles.js";
import getTileData from "/canvas/workerInterfaces/worker/getTileData.js";

export default {
    parseWorldFile,
    renderLayersImages,
    saveWorldFile,
    verifyWorldFileFormat,
    editTiles,
    getTileData
}