import React, { useEffect, useState } from "react";
import store from "/state/store.js";
import { changePercentage } from "/state/modules/status.js";

import "./status-bar.css";

function StatusBar() {
   const [description, stateChangeDescription] = useState(null);
   const [percentage, stateChangePercentage] = useState(null);

   useEffect(() => {
      store.subscribe(() => {
         const state = store.getState();
         stateChangePercentage(state.status.percentage)
         stateChangeDescription(state.status.description);

         if (state.status.percentage == 100) {
            store.dispatch(changePercentage(null));
         }
      });
   }, []);

   return (
      <div className="status-bar-container">
         <div className="status-bar">
            <div className="status-zoom"></div>
            <div className="status-action">
               <span>{ description == null ? "-" : description }</span>
               <div className="status-action-percentage" style={{width: percentage == null ? 0 : percentage + "%"}}></div>
            </div>
         </div>
      </div>
   )
}

export default StatusBar;
