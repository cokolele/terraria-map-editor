import React from "react";

import "/components/styles/statusbar/loading.css";

function StatusbarLoading({ visible }) {
   return (
      <div className={"statusbar-loading" + (!visible ? " statusbar-loading--hidden" : "")}>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
   );
}

export default StatusbarLoading;
