import workerInterfaces from "/canvas/workerInterfaces/worker/index.js";

let Worker = new function() {
    this.worldObject;
    this.workerInterfaces = workerInterfaces;

    this.interfacesController = async ({ data }) => {
        try {
            switch(data.action) {

                case "PARSE_WORLD_FILE":
                    await this.workerInterfaces.parseWorldFile(data);
                    break;

                case "RENDER_LAYERS_IMAGES":
                    await this.workerInterfaces.renderLayersImages(data);
                    break;

                case "SAVE_WORLD_FILE":
                    await this.workerInterfaces.saveWorldFile(data);
                    break;

                case "VERIFY_WORLD_FILE_FORMAT":
                    await this.workerInterfaces.verifyWorldFileFormat(data);
                    break;

                case "EDIT_TILES":
                    await this.workerInterfaces.editTiles(data);
                    break;

                case "GET_TILE_DATA":
                    await this.workerInterfaces.getTileData(data);
                    break;

                case "BLOCKSWAP":
                    await this.workerInterfaces.blockSwap(data);
                    return;

            }
        } catch (e) {
            console.error("worker error: ", e);
            postMessage({
                action: "ERROR",
                error: {
                    ...e,
                    stack: e.stack
                }
            });
        }
    }
}

self.onmessage = Worker.interfacesController;

export default Worker;