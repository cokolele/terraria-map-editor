import Worker from "/canvas/worker.js";

import terrariaWorldParser from "/../terraria-world-file-js/src/browser/terraria-world-parser.js";

export default async function({ worldFile }) {
    try {
        let worldObject = await new terrariaWorldParser().loadFile(worldFile);
        worldObject = worldObject.parse({
            sections: ["necessary"]
        });
        postMessage({
            action: "RETURN_MAP_FILE_VALIDITY",
            valid: true
        });
    } catch (e) {
        postMessage({
            action: "RETURN_MAP_FILE_VALIDITY",
            valid: false
        });
    }
}