import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";
import localSettings from "/utils/localSettings.js";

import LAYERS from "/utils/dbs/LAYERS.js";

import OptionbarOptionLayer from "/components/optionbar/layer.jsx";
import OptionbarOptionSize from "/components/optionbar/size.jsx";
import OptionbarOptionId from "/components/optionbar/id.jsx";
import OptionbarOptionWorldPoint from "/components/optionbar/worldPoint.jsx";

import "/components/styles/optionbar.css";

import toolsConfig from "/app/tools.js";

function Optionbar({ stateChange, show, running, selectedTool, optionbarState }) {
   const ToolIcon = toolsConfig[selectedTool].icon;

   const setState = (newState) => {
      stateChange("optionbar", newState);
      localSettings.set("optionbarState", newState);
   }

   return (
      show &&
      <div className="optionbar-container">
         <div className="optionbar">
            <div className={"optionbar-icon" + (toolsConfig[selectedTool].stroke ? " optionbar-icon--stroke" : "")}>
               <ToolIcon size="100%"/>
            </div>
            <div className="optionbar-divider"></div>
            {
               running && (selectedTool == "pencil" || selectedTool == "eraser" || selectedTool == "bucket") &&
               <>
                  <OptionbarOptionLayer state={optionbarState} setState={setState} addEraserOptions={selectedTool == "eraser" ? true : false}/>
                  {
                     selectedTool != "bucket" &&
                     <>
                        <div className="optionbar-divider"></div>
                        <OptionbarOptionSize state={optionbarState} setState={setState}/>
                     </>
                  }
                  {
                     selectedTool != "eraser" &&
                     <>
                        <div className="optionbar-divider"></div>
                        <OptionbarOptionId state={optionbarState} setState={setState}/>
                     </>
                  }
               </>
            }
            {
               running && selectedTool == "worldPoint" &&
               <OptionbarOptionWorldPoint state={optionbarState} setState={setState}/>
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
         optionbarState: {
            layer: state.optionbar.layer,
            size: state.optionbar.size,
            id: state.optionbar.id,
            ordered: state.optionbar.ordered,
            locked: state.optionbar.locked,
            worldPoint: state.optionbar.worldPoint,
         }
      };
   },
   { stateChange }
)(Optionbar);
