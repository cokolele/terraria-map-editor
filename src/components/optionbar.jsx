import React from "react";
import { connect } from "react-redux";

import OptionbarOptionLayer from "/components/optionbar/layer.jsx";
import OptionbarOptionSize from "/components/optionbar/size.jsx";
import OptionbarOptionId from "/components/optionbar/id.jsx";

import "/components/styles/optionbar.css";

import toolsConfig from "/app/tools.js";

function Optionbar({ show, running, selectedTool }) {
   const ToolIcon = toolsConfig[selectedTool].icon;

   return (
      show &&
      <div className="optionbar-container">
         <div className="optionbar">
            <div className={"optionbar-icon" + (toolsConfig[selectedTool].stroke ? " optionbar-icon--stroke" : "")}>
               <ToolIcon size="100%"/>
            </div>
            <div className="optionbar-divider"></div>
            {
               running && selectedTool != "move" && selectedTool != "select" && selectedTool != "tileInfo" &&
               <>
                  <OptionbarOptionLayer/>
                  {
                     selectedTool != "bucket" &&
                     <>
                        <div className="optionbar-divider"></div>
                        <OptionbarOptionSize/>
                     </>
                  }
                  {
                     selectedTool != "eraser" &&
                     <>
                        <div className="optionbar-divider"></div>
                        <OptionbarOptionId/>
                     </>
                  }
               </>
            }
         </div>
      </div>
   );
}

export default connect(state => {
   return {
      show: state.view.toolbar,
      selectedTool: state.toolbar.tool,
      running: state.canvas.running
   };
})(Optionbar);
