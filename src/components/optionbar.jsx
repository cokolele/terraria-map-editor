import React from "react";
import { connect } from "react-redux";

import "/components/styles/optionbar.css";

import toolsConfig from "/app/tools.js";

function Optionbar({ show, selectedTool }) {
   const ToolIcon = toolsConfig[selectedTool].icon;
   const stroke = toolsConfig[selectedTool].stroke;

   return (
      show &&
      <div className="optionbar-container">
         <div className="optionbar">
            <div className={"optionbar-icon" + (stroke ? " optionbar-icon--stroke" : "")}>
               <ToolIcon size={20}/>
            </div>
            <div className="optionbar-divider"></div>
         </div>
      </div>
   );
}

export default connect(state => {
   return {
      show: state.app.view.toolbar,
      selectedTool: state.app.toolbar.tool
   }
})(Optionbar);
