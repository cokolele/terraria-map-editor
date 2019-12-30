import menuOptionsConfig from "/app/menu.js";

const TOGGLE_OPTION = "twe/menu/TOGGLE_OPTION";
const SET_OPTION = "twe/menu/SET_OPTION";

let default_state = {
    view: {
        sidebar: menuOptionsConfig.View.Sidebar.value,
        toolbar: menuOptionsConfig.View.Toolbar.value
    }
}

// Reducer
export default function menu(state = default_state, action) {
    switch (action.type) {
        case TOGGLE_OPTION:
            state[action.option[0]][action.option[1]] = !state[action.option[0]][action.option[1]];
            return {...state};
        case SET_OPTION:
            state[action.option[0]][action.option[1]] = action.value;
            return {...state};
        default:
            return {...state};
    }
}

function toggleOption(option) {
    return { type: TOGGLE_OPTION, option };
}

function setOption(option, value) {
    return { type: SET_OPTION, option, value };
}

export {
    toggleOption,
    setOption
};