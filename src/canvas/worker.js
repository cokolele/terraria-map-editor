import workerInterfaces from "/canvas/workerInterfaces/worker/index.js";

let Worker = new function() {
    this.worldObject;
    this.workerInterfaces = workerInterfaces;

    this.interfacesController = ({ data }) => {
        try {
            switch(data.action) {

                case "PARSE_WORLD_FILE":
                    this.workerInterfaces.parseWorldFile(data);
                    break;

                case "RENDER_LAYERS_IMAGES":
                    this.workerInterfaces.renderLayersImages(data);
                    break;

                case "SAVE_WORLD_FILE":
                    this.workerInterfaces.saveWorldFile(data);
                    break;

                case "VERIFY_WORLD_FILE_FORMAT":
                    this.workerInterfaces.verifyWorldFileFormat(data);
                    break;

                case "EDIT_TILES":
                    this.workerInterfaces.editTiles(data);
                    break;

                case "GET_TILE_DATA":
                    this.workerInterfaces.getTileData(data);
                    break;

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