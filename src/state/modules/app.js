const CHANGE_WORLD_FILE = "twe/app/CHANGE_WORLD_FILE";
const CHANGE_WORLD_OBJECT = "twe/app/CHANGE_WORLD_OBJECT";

const default_state = {
    worldFile: null,
    worldObject: null
};

// Reducer
export default function app(state = default_state, action) {
    switch (action.type) {
        case CHANGE_WORLD_FILE:
            return {
                ...state,
                worldFile: action.worldFile
            };
        case CHANGE_WORLD_OBJECT:
            return {
                ...state,
                worldObject: action.worldObject
            };
        default:
            return {...state};
    }
}

// Action Creators
function changeWorldFile(worldFile) {
    return { type: CHANGE_WORLD_FILE, worldFile };
}

function changeWorldObject(worldObject) {
    return { type: CHANGE_WORLD_OBJECT, worldObject };
}

export {
    changeWorldFile,
    changeWorldObject
};