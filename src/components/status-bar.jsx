import React, { useEffect, useState } from "react";
import store from "/state/store.js";

import "./status-bar.css";

function StatusBar() {
   const [percentage, changePercentage] = useState(null);

   useEffect(() => {
      store.subscribe(() => {
         changePercentage(store.getState().status.percentage);
      });
   }, []);

   return (
      <div className="status-bar-container">
         <div className="status-bar">
            <div className="status-zoom">ss</div>
            <div className="status-percentage">{percentage}</div>
         </div>
      </div>
   )
}

export default StatusBar;
