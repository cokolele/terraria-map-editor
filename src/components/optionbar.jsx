import React from "react";
import { connect } from "react-redux";
import { stateSetKey } from "/state/modules/app.js";

import OptionbarInputSelect from "/components/optionbar/input-select.jsx";
import OptionbarInputSlider from "/components/optionbar/input-slider.jsx";
import "/components/styles/optionbar.css";

import LAYERS from "/app/canvas/enum-LAYERS.js";
import toolsConfig from "/app/tools.js";

const LayersOptions = [
   ["Tiles", LAYERS.TILES],
   ["Walls", LAYERS.WALLS],
   ["Wires", LAYERS.WIRES],
   ["Liquids", LAYERS.LIQUIDS],
]

function Optionbar({ show, selectedTool, stateChangeOptionbarLayer, stateSetKey }) {
   const ToolIcon = toolsConfig[selectedTool].icon;
   const stroke = toolsConfig[selectedTool].stroke;

   const onLayerSelectChange = (LAYER) => {
      stateSetKey(["optionbar", "layer"], LAYER);
   }

   const onToolSizeChange = (size) => {
      stateSetKey(["optionbar", "size"], size);
   }

   return (
      show &&
      <div className="optionbar-container">
         <div className="optionbar">
            <div className={"optionbar-icon" + (stroke ? " optionbar-icon--stroke" : "")}>
               <ToolIcon size="auto"/>
            </div>
            <div className="optionbar-divider"></div>
            <OptionbarInputSelect label="Layer" options={LayersOptions} onChange={onLayerSelectChange}/>
            <div className="optionbar-divider"></div>
            <OptionbarInputSlider label="Size" value={6} min={1} max={72} onChange={onToolSizeChange} sliderWidth="6rem" input inputMin={0} inputMax={999} inputWidth="5ch"/>
         </div>
      </div>
   );
}

export default connect(
   state => {
      return {
         show: state.app.view.toolbar,
         selectedTool: state.app.toolbar.tool
      }
   },
   { stateSetKey }
)(Optionbar);
