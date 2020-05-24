import { localSettings } from "/utils/localStorage.js";
import LAYERS from "/utils/dbs/LAYERS.js";

const CHANGE_WORLD_FILE = "twe/app/CHANGE_WORLD_FILE";
const CHANGE_WORLD_OBJECT = "twe/app/CHANGE_WORLD_OBJECT";
const CHANGE_RUNNING = "twe/app/CHANGE_RUNNING";
const CHANGE_USER = "twe/app/CHANGE_USER";
const CHANGE_MODAL = "twe/app/CHANGE_MODAL";
const TOGGLE_VIEW_OPTION = "twe/app/TOGGLE_VIEW_OPTION";
const CHANGE_TOOLBAR_TOOL = "twe/app/CHANGE_TOOLBAR_TOOL";
const TOGGLE_LAYER_VISIBILITY = "twe/app/TOGGLE_LAYER_VISIBILITY";
const CHANGE_OPTIONBAR_LAYER = "twe/app/CHANGE_OPTIONBAR_LAYER";
const TOGGLE_UNSAFE = "twe/app/TOGGLE_UNSAFE";
const TOGGLE_UNSAFE_ONLY_TILES = "twe/app/TOGGLE_UNSAFE_ONLY_TILES";

const SET_KEY = "twe/app/SET_KEY";

let defaultState = {
    worldFile: null,
    worldObject: null,
    running: false,
    loggedIn: false,
    user: null,
    modal: null,
    view: {
        toolbar:  localSettings.toolbar !== undefined ? localSettings.toolbar : true,
        sidebar: localSettings.sidebar !== undefined ? localSettings.sidebar : true
    },
    toolbar: {
        tool: "move"
    },
    optionbar: {
        layer: LAYERS.TILES,
        size: 6,
        color: 0
    },
    layersVisibility: {
        NPCs: true,
    },
    unsafe: false,
    unsafeOnlyTiles: false
};

Object.values(LAYERS).forEach(LAYER => {
    defaultState.layersVisibility[LAYER] = true;
});

// Reducer
export default function app(state = defaultState, action) {
    switch (action.type) {
        case SET_KEY:
            if (typeof action.key == "object") {
                let stateDepthted = state;
                let key = action.key.pop();
                action.key.forEach(key => { stateDepthted = stateDepthted[key] });
                stateDepthted[key] = action.value;
            }
            else
                state[action.key] = action.value;

            return {...state};
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
        case CHANGE_RUNNING:
            return {
                ...state,
                running: action.running
            };
        case CHANGE_USER:
            if (action.user === null)
                return {
                    ...state,
                    loggedIn: false,
                    user: null
                };
            else
                return {
                    ...state,
                    loggedIn: true,
                    user: action.user
                };
        case CHANGE_MODAL:
            return {
                ...state,
                modal: action.modal
            };
        case TOGGLE_VIEW_OPTION:
            state.view[action.option] = !state.view[action.option];
            return {...state};
        case CHANGE_TOOLBAR_TOOL:
            state.toolbar.tool = action.tool;
            return {...state};
        case TOGGLE_LAYER_VISIBILITY:
            state.layersVisibility[action.LAYER] = !state.layersVisibility[action.LAYER];
            return {...state};
        case TOGGLE_UNSAFE:
            state.unsafe = !state.unsafe;
            return {...state};
        case TOGGLE_UNSAFE_ONLY_TILES:
            state.unsafeOnlyTiles = !state.unsafeOnlyTiles;
            return {...state};
        default:
            return {...state};
    }
}

// Action Creators
function stateSetKey(key, value) {
    return { type: SET_KEY, key, value };
}

function stateChangeWorldFile(worldFile) {
    return { type: CHANGE_WORLD_FILE, worldFile };
}

function stateChangeWorldObject(worldObject) {
    return { type: CHANGE_WORLD_OBJECT, worldObject };
}

function stateChangeRunning(running) {
    return { type: CHANGE_RUNNING, running };
}

function stateChangeUser(user) {
    return { type: CHANGE_USER, user };
}

function stateChangeModal(modal) {
    return { type: CHANGE_MODAL, modal }
}

function stateToggleViewOption(option) {
    return { type: TOGGLE_VIEW_OPTION, option };
}

function stateChangeToolbarTool(tool) {
    return { type: CHANGE_TOOLBAR_TOOL, tool };
}

function stateToggleLayerVisibility(LAYER) {
    return { type: TOGGLE_LAYER_VISIBILITY, LAYER };
}

function stateToggleUnsafe(unsafe) {
    return { type: TOGGLE_UNSAFE, unsafe };
}

function stateToggleUnsafeOnlyTiles(unsafeOnlyTiles) {
    return { type: TOGGLE_UNSAFE_ONLY_TILES, unsafeOnlyTiles };
}

export {
    stateSetKey,
    stateChangeWorldFile,
    stateChangeWorldObject,
    stateChangeRunning,
    stateChangeUser,
    stateChangeModal,
    stateToggleViewOption,
    stateChangeToolbarTool,
    stateToggleLayerVisibility,
    stateToggleUnsafe,
    stateToggleUnsafeOnlyTiles
};