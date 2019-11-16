const PERCENTAGE_CHANGE = "twe/status/PERCENTAGE_CHANGE";
const DESCRIPTION_CHANGE = "twe/status/DESCRIPTION_CHANGE";

const default_state = {
    percentage: null,
    description: null
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
        default:
            return state;
    }
}

// Action Creators
function changePercentage(percentage) {
    return { type: PERCENTAGE_CHANGE, percentage };
}

function changeDescription(description) {
    return { type: DESCRIPTION_CHANGE, description };
}

export {
    changePercentage,
    changeDescription
};