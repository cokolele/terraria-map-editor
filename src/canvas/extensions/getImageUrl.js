import Main from "/canvas/main.js";
import LAYERS from "/utils/dbs/LAYERS.js";

export default function() {
    if (!Main.state.canvas.running)
        return null;

    const _tmpCtx = document.createElement("canvas").getContext("2d");

    _tmpCtx.canvas.width = Main.state.canvas.worldObject.header.maxTilesX;
    _tmpCtx.canvas.height = Main.state.canvas.worldObject.header.maxTilesY;

    Object.values(LAYERS).forEach(LAYER => {
        _tmpCtx.drawImage(Main.layersCtxs[LAYER].canvas, 0, 0);
    });

    return _tmpCtx.canvas.toDataURL("image/png;base64");
}