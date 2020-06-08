import React from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import InputSelect from "/components/inputs/input-select.jsx";

import LAYERS from "/utils/dbs/LAYERS.js";

const LayersOptions = [
   ["Tiles", LAYERS.TILES],
   ["Walls", LAYERS.WALLS],
   ["Wires", LAYERS.WIRES],
   ["Liquids", LAYERS.LIQUIDS],
]

function OptionbarOptionLayer({ stateChange, LAYER }) {
   const onChange = (LAYER) => {
      LAYER = parseInt(LAYER);
      stateChange(["optionbar", "layer"], LAYER);
   }

   return <InputSelect label="Layer" options={LayersOptions} value={LAYER} onChange={onChange}/>;
}

export default connect(
   state => {
      return {
         LAYER: state.optionbar.layer
      };
   },
   { stateChange }
)(OptionbarOptionLayer);
