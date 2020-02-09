import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateSetKey } from "/state/modules/app.js";

import OptionbarInputSelect from "/components/optionbar/input-select.jsx";

import LAYERS from "/app/canvas/enum-LAYERS.js";

const LayersOptions = [
   ["Tiles", LAYERS.TILES],
   ["Walls", LAYERS.WALLS],
   ["Wires", LAYERS.WIRES],
   ["Liquids", LAYERS.LIQUIDS],
]

function OptionbarOptionLayer({ stateSetKey, value, onChange }) {
   const [activeLayer, setActiveLayer] = useState(value);

   const _onChange = (LAYER) => {
      LAYER = parseInt(LAYER);
      setActiveLayer(LAYER);
      stateSetKey(["optionbar", "layer"], LAYER);
      onChange(LAYER);
   }

   useEffect(() => {
      _onChange(value);
   }, []);

   return <OptionbarInputSelect label="Layer" options={LayersOptions} value={activeLayer} onChange={_onChange}/>;
}

export default connect(
   null,
   { stateSetKey }
)(OptionbarOptionLayer);
