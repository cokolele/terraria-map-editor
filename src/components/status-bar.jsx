import React, { useEffect, useState } from "react";
import store from "/state/store.js";

import "./status-bar.css";

function StatusBar() {
   const [description, changeDescription] = useState(null);
   const [percentage, changePercentage] = useState(null);

   useEffect(() => {
      store.subscribe(() => {
         const state = store.getState();
         changePercentage(state.status.percentage)
         changeDescription(state.status.description);
      });
   }, []);

   return (
      <div className="status-bar-container">
         <div className="status-bar">
            <div className="status-zoom">{ percentage == null ? "-" : percentage }</div>
            <div className="status-action">{ description == null ? "-" : description }</div>
         </div>
      </div>
   )
}

export default StatusBar;
