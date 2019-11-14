import React, { useEffect, useState } from "react";
import store from "/state/store.js";

import "./status-bar.css";

function StatusBar() {
   const [description, changeDescription] = useState(null);

   useEffect(() => {
      store.subscribe(() => {
         changeDescription(store.getState().status.description);
         console.log(store.getState().status.description);
      });
   }, []);

   return (
      <div className="status-bar-container">
         <div className="status-bar">
            <div className="status-zoom">-</div>
            <div className="status-percentage">{ description == null ? "-" : description }</div>
         </div>
      </div>
   )
}

export default StatusBar;
