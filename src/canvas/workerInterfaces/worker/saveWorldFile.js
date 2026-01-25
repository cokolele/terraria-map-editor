import Worker from '/canvas/worker.js'

import { FileSaver as TerrariaFileSaver } from 'terraria-world-file'

export default async function ({ worldObject }) {
  if (!Worker.worldObject) {
    throw new Error('web-worker: save: no world loaded')
    return
  }

  postMessage({
    action: 'RETURN_SAVING_PERCENT_INCOMING',
  })

  const newWorldFile = new TerrariaFileSaver().save(
    {
      ...worldObject,
      worldTiles: {
        tiles: Worker.worldObject.tiles,
      },
    },
    (percent) => {
      postMessage({
        action: 'RETURN_SAVING_PERCENT',
        percent,
      })
    },
  )

  postMessage({
    action: 'RETURN_NEW_WORLD_FILE',
    newWorldFile,
  })
}
