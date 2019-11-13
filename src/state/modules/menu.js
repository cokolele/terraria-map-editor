const OPTION_CHANGE = "twe/menu/OPTION_CHANGE";
const FILE_CHANGE = "twe/menu/FILE_CHANGE";

const default_state = {
    file: null,
}

// Reducer
export default function menu(state = default_state, action) {
    switch (action.type) {
        case FILE_CHANGE:
            return {
                ...state,
                file: action.file
            };
        default:
            return state;
    }
}

// Action Creators
function changeWorldFile(file) {
    return { type: FILE_CHANGE, file };
}

export {
    changeWorldFile
};