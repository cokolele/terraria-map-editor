import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import OptionbarInputSelect from "/components/inputs/input-select.jsx";
import OptionbarInput from "/components/inputs/input-select.jsx";

import LAYERS from "/utils/dbs/LAYERS.js";
import editableTiles from "/utils/dbs/editable-tiles.js";
import editableWalls from "/utils/dbs/editable-walls.js";

const tilesColors = Object.entries(editableTiles).map(([id, name]) => [name, id]);
const wallsColors = Object.entries(editableWalls).map(([id, name]) => [name, id]);
const wiresColors = ["red", "green", "blue", "yellow"];
const liquidsColors = ["water", "lava", "honey"];

delete editableTiles, editableWalls;

function OptionbarOptionLayer({ stateChange, value, onChange, LAYER }) {
   const [activeColor, setActiveColor] = useState(value);

   const _onChange = (color) => {
      if (LAYER == LAYERS.TILES || LAYER == LAYERS.WALLS)
         color = parseInt(color);
      setActiveColor(color);
      stateChange(["optionbar", "color"], color);
      onChange(color);
   }

   useEffect(() => {
      _onChange(value);
   }, [value]);

   switch(parseInt(LAYER)) {
      case LAYERS.TILES:
         return <OptionbarInputSelect label="Tile" options={tilesColors} value={activeColor} onChange={_onChange}/>;
      case LAYERS.WALLS:
         return <OptionbarInputSelect label="Wall" options={wallsColors} value={activeColor} onChange={_onChange}/>;
      case LAYERS.WIRES:
         return <OptionbarInputSelect label="Wire" options={wiresColors} value={activeColor} onChange={_onChange}/>;
      case LAYERS.LIQUIDS:
         return <OptionbarInputSelect label="Liquid type" options={liquidsColors} value={activeColor} onChange={_onChange}/>;
   }
}

export default connect(
   null,
   { stateChange }
)(OptionbarOptionLayer);
