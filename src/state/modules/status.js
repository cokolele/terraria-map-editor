const PERCENTAGE_CHANGE = "twe/status/PERCENTAGE_CHANGE";
const DESCRIPTION_CHANGE = "twe/status/DESCRIPTION_CHANGE";
const ERROR_CHANGE = "twe/status/ERROR_CHANGE";

const default_state = {
    percentage: null,
    description: null,
    error: null
}

// Reducer
export default function status(state = default_state, action) {
    switch (action.type) {
        case PERCENTAGE_CHANGE:
            return {
                ...state,
                percentage: action.percentage
            };
        case DESCRIPTION_CHANGE:
            return {
                ...state,
                description: action.description
            };
        case ERROR_CHANGE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

// Action Creators
function stateChangePercentage(percentage) {
    return { type: PERCENTAGE_CHANGE, percentage };
}

function stateChangeDescription(description) {
    return { type: DESCRIPTION_CHANGE, description };
}

function stateChangeError(error) {
    return { type: ERROR_CHANGE, error };
}

export {
    stateChangePercentage,
    stateChangeDescription,
    stateChangeError
};