import menuOptionsConfig from "/app/menu.js";

const CHANGE_WORLD_FILE = "twe/app/CHANGE_WORLD_FILE";
const CHANGE_WORLD_OBJECT = "twe/app/CHANGE_WORLD_OBJECT";
const CHANGE_USER = "twe/app/CHANGE_USER";
const CHANGE_MODAL = "twe/app/CHANGE_MODAL";
const TOGGLE_VIEW_OPTION = "twe/app/TOGGLE_VIEW_OPTION";
const CHANGE_TOOLBAR_TOOL = "twe/app/CHANGE_TOOLBAR_TOOL";

const default_state = {
    worldFile: null,
    worldObject: null,
    loggedIn: false,
    user: null,
    modal: null,
    view: {
        sidebar: menuOptionsConfig.View.Sidebar.value,
        toolbar: menuOptionsConfig.View.Toolbar.value
    },
    toolbar: {
        tool: "move"
    }
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

function changeUser(user) {
    return { type: CHANGE_USER, user };
}

function changeModal(modal) {
    return { type: CHANGE_MODAL, modal }
}

function toggleViewOption(option) {
    return { type: TOGGLE_VIEW_OPTION, option };
}

function changeToolbarTool(tool) {
    return { type: CHANGE_TOOLBAR_TOOL, tool };
}

export {
    changeWorldFile,
    changeWorldObject,
    changeUser,
    changeModal,
    toggleViewOption,
    changeToolbarTool
};