import React, { useState } from "react";

export default function useToggle(state1, state2, proxy) {
    const [state, update] = useState(state1);

    return [state, async () => {
        if (proxy)
            await proxy();
        update( state == state1 ? state2 : state1 );
    }];
}