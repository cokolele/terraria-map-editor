import Main from "/canvas/main.js";

export default async function(file) {
    return await Main.workerInterfaces.verifyWorldFileFormat(file);
}