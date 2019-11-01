import React, { useState } from "react";

export default function useToggle(state1, state2) {
    const [state, update] = useState(state1);

    return [state, () => {
        update( state == state1 ? state2 : state1 );
    }];
}