import { localSettings } from "/utils/localStorage.js";
import LAYERS from "/utils/dbs/LAYERS.js";

/*
    i know this way of use may defeat some purpose of the redux, but i found it to make the most sense for me in this app
*/

const GENERAL_CHANGE = "twe/app/GENERAL_CHANGE";
const GENERAL_TOGGLE = "twe/app/GENERAL_TOGGLE";
const TRIGGER_RESET_WORLD = "twe/app/TRIGGER_RESET_WORLD";

let defaultState = {
    canvas: {
        running: false,
        worldFile: null,
        worldObject: null,
        unsafe: false,
        unsafeOnlyTiles: false,
        ignoreBounds: false,
        mouseImagePosX: null,
        mouseImagePosY: null
    },
    status: {
        description: null,
        percent: null,
        error: null
    },
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
};

Object.values(LAYERS).forEach(LAYER => {
    defaultState.layersVisibility[LAYER] = true;
});

// Reducer
export default function app(state = defaultState, action) {
    switch (action.type) {

        case GENERAL_CHANGE:
            if (typeof action.args[0] == "string") // key value pair
                state[action.args[0]] = action.args[1];
            else {
                if (action.args[1]) { //nested key value pair
                    let _state = state, key = action.args[0].pop();
                    action.args[0].forEach(e => { _state = _state[e] });
                    _state[key] = action.args[1];
                } else { //multiple state changes
                    action.args[0].forEach(args => {
                        if (typeof args[0] == "string") // key value pair
                            state[args[0]] = args[1];
                        else { //nested key value pair
                            let _state = state, key = args[0].pop();
                            args[0].forEach(e => { _state = _state[e] });
                            _state[key] = args[1];
                        }
                    });
                }
            }
            return {...state};

        case GENERAL_TOGGLE:
            if (typeof action.args[0] == "string") // key value pair
                state[action.args[0]] = !state[action.args[0]];
            else { //nested key value pair
                let _state = state, key = action.args[0].pop();
                action.args[0].forEach(e => { _state = _state[e] });
                _state[key] = !_state[key];
            }
            return {...state};

        case TRIGGER_RESET_WORLD:
            state.canvas.running = false;
            state.canvas.worldFile = null;
            state.canvas.worldObject = null;
            state.status.description = null;
            state.status.percent = null;
            state.status.error = null;
            return { ...state };

        default:
            return {...state};
    }
}

// Action Creators
function stateChange(...args) {
    return { type: GENERAL_CHANGE, args };
}

function stateToggle(...args) {
    return { type: GENERAL_TOGGLE, args };
}

function stateTriggerResetWorld() {
    return { type: TRIGGER_RESET_WORLD };
}

export {
    stateChange,
    stateToggle,
    stateTriggerResetWorld
};