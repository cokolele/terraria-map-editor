const CHANGE_FILE = "twe/menu/CHANGE_FILE";
const TOGGLE_OPTION = "twe/menu/TOGGLE_OPTION";

const default_state = {
    file: null,
    view: {
        sidebar: true,
        toolbar: false
    }
}

// Reducer
export default function menu(state = default_state, action) {
    switch (action.type) {
        case CHANGE_FILE:
            return {
                ...state,
                file: action.file
            };
        case TOGGLE_OPTION:
            const newState = state;
            newState[action.option[0]][action.option[1]] = !newState[action.option[0]][action.option[1]];
            return {...newState};
        default:
            return {...state};
    }
}

// Action Creators
function changeWorldFile(file) {
    return { type: CHANGE_FILE, file };
}

function toggleOption(option) {
    return { type: TOGGLE_OPTION, option };
}

export {
    changeWorldFile,
    toggleOption
};