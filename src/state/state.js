import { localSettings } from "/utils/localStorage.js";
import LAYERS from "/utils/dbs/LAYERS.js";

/*
    i know this way of use may defeat some purpose of the redux, but i found it to make the most sense for me in this app
*/

const GENERAL_CHANGE = "twe/app/GENERAL_CHANGE";
const GENERAL_TOGGLE = "twe/app/GENERAL_TOGGLE";

let defaultState = {
    canvas: {
        running: false,
        worldFile: undefined,
        worldObject: null,
        unsafe: false,
        unsafeOnlyTiles: false,
        ignoreBounds: false
    },
    tileData: null,
    status: {
        description: null,
        percent: null,
        error: null,
        loading: false
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
        id: 0
    },
    layersVisibility: {
        NPCs: true,
    },
    mobile: false,
    appbar: {
        drawer: null
    }
};

Object.values(LAYERS).forEach(LAYER => {
    defaultState.layersVisibility[LAYER] = true;
});

// Reducer
export default function app(state = defaultState, action) {
    switch (action.type) {

        case GENERAL_CHANGE:
            if (window.statedebug)
                console.log(JSON.stringify(action.args), state);
            if (typeof action.args[0] == "string") // key value pair
                state[action.args[0]] = action.args[1];
            else {
                if (action.args[1] !== undefined) { //nested key value pair
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
            if (window.statedebug)
                console.log(JSON.stringify(action.args), state);
            if (typeof action.args[0] == "string") // key value pair
                state[action.args[0]] = !state[action.args[0]];
            else { //nested key value pair
                let _state = state, key = action.args[0].pop();
                action.args[0].forEach(e => { _state = _state[e] });
                _state[key] = !_state[key];
            }
            return {...state};

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

export {
    stateChange,
    stateToggle
};