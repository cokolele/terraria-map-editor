import React from "react";

import LAYERS from "/utils/dbs/LAYERS.js";
import InputSelect from "/components/inputs/input-select.jsx";

const options = [
   ["Tiles", LAYERS.TILES],
   ["Walls", LAYERS.WALLS],
   ["Wires", LAYERS.WIRES],
   ["Liquids", LAYERS.LIQUIDS]
]

function OptionbarOptionLayer({ state, setState, addAllOption }) {
   const onChange = (layer) => {
      setState({ ...state, id: null, layer: parseInt(layer) });
   };

   return <InputSelect label="Layer" options={addAllOption ? [...options, ["All", 100]] : options} value={state.layer} onChange={onChange}/>;
}

export default OptionbarOptionLayer;
