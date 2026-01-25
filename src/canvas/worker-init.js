import workerInterfaces from '/canvas/workerInterfaces/worker/index.js'

self.onmessage = async ({ data }) => {
  try {
    switch (data.action) {
      case 'PARSE_WORLD_FILE':
        await workerInterfaces.parseWorldFile(data)
        break

      case 'RENDER_LAYERS_IMAGES':
        await workerInterfaces.renderLayersImages(data)
        break

      case 'SAVE_WORLD_FILE':
        await workerInterfaces.saveWorldFile(data)
        break

      case 'VERIFY_WORLD_FILE_FORMAT':
        await workerInterfaces.verifyWorldFileFormat(data)
        break

      case 'EDIT_TILES':
        await workerInterfaces.editTiles(data)
        break

      case 'GET_TILE_DATA':
        await workerInterfaces.getTileData(data)
        break

      case 'BLOCK_SWAP':
        await workerInterfaces.blockSwap(data)
        return

      case 'BLOCK_REPLACE':
        await workerInterfaces.blockReplace(data)
        return
    }
  } catch (e) {
    console.error('worker error: ', e)
    postMessage({
      action: 'ERROR',
      error: {
        ...e,
        stack: e.stack,
        message: e.message,
      },
    })
  }
}
