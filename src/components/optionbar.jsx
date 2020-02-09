import React, { useState } from "react";
import { connect } from "react-redux";

import OptionbarOptionLayer from "/components/optionbar/options/layer.jsx";
import OptionbarOptionSize from "/components/optionbar/options/size.jsx";
import OptionbarOptionColor from "/components/optionbar/options/color.jsx";

import "/components/styles/optionbar.css";

import toolsConfig from "/app/tools.js";
import LAYERS from "/app/canvas/enum-LAYERS.js";

const permValues = {
   LAYER: LAYERS.TILES,
   size: 6,
   colors: {}
};
permValues.colors[LAYERS.TILES] = 0;
permValues.colors[LAYERS.WALLS] = 1;
permValues.colors[LAYERS.WIRES] = "red";
permValues.colors[LAYERS.LIQUIDS] = "water";

function Optionbar({ show, selectedTool, stateChangeOptionbarLayer, stateSetKey, running }) {
   const ToolIcon = toolsConfig[selectedTool].icon;
   const stroke = toolsConfig[selectedTool].stroke;

   const [LAYER, setLAYER] = useState(permValues.LAYER);

   return (
      show &&
      <div className="optionbar-container">
         <div className="optionbar">
            <div className={"optionbar-icon" + (stroke ? " optionbar-icon--stroke" : "")}>
               <ToolIcon size="auto"/>
            </div>
            <div className="optionbar-divider"></div>
            {
               running && selectedTool != "move" && selectedTool != "select" &&
               <>
                  <OptionbarOptionLayer value={permValues.LAYER} onChange={(LAYER) => {permValues.LAYER = LAYER; setLAYER(LAYER)}}/>
                  {
                     selectedTool != "bucket" &&
                     <>
                        <div className="optionbar-divider"></div>
                        <OptionbarOptionSize value={permValues.size} onChange={(size) => {permValues.size = size}}/>
                     </>
                  }
                  {
                     selectedTool != "eraser" &&
                     <>
                        <div className="optionbar-divider"></div>
                        <OptionbarOptionColor LAYER={LAYER} value={permValues.colors[LAYER]} onChange={(color) => {permValues.colors[LAYER] = color}}/>
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
      show: state.app.view.toolbar,
      selectedTool: state.app.toolbar.tool,
      running: state.app.running
   };
})(Optionbar);
