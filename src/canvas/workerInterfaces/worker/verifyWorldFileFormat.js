import { fileLoader } from 'terraria-world-file/browser'
import { FileReader as TerrariaFileReader } from 'terraria-world-file'

export default async function ({ worldFile }) {
  try {
    ;(await new TerrariaFileReader().loadFile(fileLoader, worldFile)).parse()

    postMessage({
      action: 'RETURN_MAP_FILE_VALIDITY',
      valid: true,
    })
  } catch (e) {
    postMessage({
      action: 'RETURN_MAP_FILE_VALIDITY',
      valid: false,
    })
  }
}
