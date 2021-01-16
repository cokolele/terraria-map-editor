import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";
import localSettings from "/utils/localSettings.js";

import LAYERS from "/utils/dbs/LAYERS.js";

import OptionbarOptionLayer from "/components/optionbar/layer.jsx";
import OptionbarOptionSize from "/components/optionbar/size.jsx";
import OptionbarOptionId from "/components/optionbar/id.jsx";

import "/components/styles/optionbar.css";

import toolsConfig from "/app/tools.js";

function Optionbar({ stateChange, show, running, selectedTool, optionbarState }) {
   const ToolIcon = toolsConfig[selectedTool].icon;

   //this creates a copy of app states optionbar, but the inputs don't manage apps state directly anymore
   const [state, setState] = useState(optionbarState);

   useEffect(() => {
      stateChange("optionbar", state);
      localSettings.set("optionbarState", state);
   }, [state]);

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
                  <OptionbarOptionLayer state={state} setState={setState} addAllOption={selectedTool == "eraser" ? true : false}/>
                  {
                     selectedTool != "bucket" &&
                     <>
                        <div className="optionbar-divider"></div>
                        <OptionbarOptionSize state={state} setState={setState}/>
                     </>
                  }
                  {
                     selectedTool != "eraser" &&
                     <>
                        <div className="optionbar-divider"></div>
                        <OptionbarOptionId state={state} setState={setState}/>
                     </>
                  }
               </>
            }
         </div>
      </div>
   );
}

export default connect(
   state => {
      return {
         show: state.view.toolbar,
         selectedTool: state.toolbar.tool,
         running: state.canvas.running,
         optionbarState: state.optionbar
      };
   },
   { stateChange }
)(Optionbar);
