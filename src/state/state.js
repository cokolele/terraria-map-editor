import localSettings from "/utils/localSettings.js";
import LAYERS from "/utils/dbs/LAYERS.js";

/*
    i know this way of use may defeat some purpose of the redux, but i found it to make the most sense for me in this app
*/

const GENERAL_CHANGE = "twe/app/GENERAL_CHANGE";
const GENERAL_TOGGLE = "twe/app/GENERAL_TOGGLE";
const GENERAL_FIRE = "twe/app/GENERAL_FIRE";

let defaultState = {
    canvas: {
        running: false,
        worldFile: undefined,
        worldObject: null,
        unsafe: false,
        unsafeOnlyTiles: false,
        ignoreBounds: false,
        events: {
            click: 0
        }
    },
    status: {
        description: null,
        percent: null,
        error: null,
        loading: false
    },
    user: null,
    modal: null,
    view: {
        toolbar: localSettings.get("toolbar", true),
        sidebar: localSettings.get("sidebar", true)
    },
    toolbar: {
        tool: "move"
    },
    optionbar: localSettings.get("optionbarState", {
        layer: LAYERS.TILES,
        size: [6, 6],
        id: null,
        ordered: false,
        locked: true,
        worldPoint: "Spawn point"
    }),
    layersVisibility: {
        NPCs: true,
        WorldPoints: true
    },
    mobile: false,
    appbar: {
        drawer: null
    },
    htmlFontSize: localSettings.get("htmlFontSize", "87.5")
};

Object.values(LAYERS).forEach(LAYER => {
    defaultState.layersVisibility[LAYER] = true;
});

// Reducer (sorry)
export default function app(state = defaultState, action) {
    if (window.statedebug)
        console.log(JSON.stringify(action.args), state);

    switch (action.type) {

        case GENERAL_CHANGE:
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
            if (typeof action.args[0] == "string") // key value pair
                state[action.args[0]] = !state[action.args[0]];
            else { //nested key value pair
                let _state = state, key = action.args[0].pop();
                action.args[0].forEach(e => { _state = _state[e] });
                _state[key] = !_state[key];
            }
            return {...state};

        case GENERAL_FIRE:
            if (typeof action.args[0] == "string")
                state[action.args[0]]++;
            else {
                let _state = state, key = action.args[0].pop();
                action.args[0].forEach(e => { _state = _state[e] });
                _state[key]++;
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

function stateFire(...args) {
    return { type: GENERAL_FIRE, args };
}

export {
    stateChange,
    stateToggle,
    stateFire
};