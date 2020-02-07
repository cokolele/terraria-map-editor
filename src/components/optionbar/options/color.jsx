import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateSetKey } from "/state/modules/app.js";

import OptionbarInputSelect from "/components/optionbar/input-select.jsx";
import OptionbarInput from "/components/optionbar/input-select.jsx";

import LAYERS from "/app/canvas/enum-LAYERS.js";

import { editableTiles, editableWalls } from "/utils/dbs/editableTilesWalls.js";

const editableTilesFormated = Object.entries(editableTiles).map(([id, name]) => [name, id]);
const editableWallsFormated = Object.entries(editableWalls).map(([id, name]) => [name, id]);
const wiresColors = ["red", "green", "blue", "yellow"];
const liquidsColors = ["water", "lava", "honey"];

delete editableTiles, editableWalls;

function OptionbarOptionLayer({ stateSetKey, value, onChange, LAYER }) {
   const [activeColor, setActiveColor] = useState(value);

   const _onChange = (color) => {
      setActiveColor(color);
      stateSetKey(["optionbar", "color"], color);
      onChange(color);
   }

   useEffect(() => {
      _onChange(value);
   }, [value]);

   switch(parseInt(LAYER)) {
      case LAYERS.TILES:
         return <OptionbarInputSelect label="Tile" options={editableTilesFormated} value={activeColor} onChange={_onChange}/>;
      case LAYERS.WALLS:
         return <OptionbarInputSelect label="Wall" options={editableWallsFormated} value={activeColor} onChange={_onChange}/>;
      case LAYERS.WIRES:
         return <OptionbarInputSelect label="Wire" options={wiresColors} value={activeColor} onChange={_onChange}/>;
      case LAYERS.LIQUIDS:
         return <OptionbarInputSelect label="Liquid type" options={liquidsColors} value={activeColor} onChange={_onChange}/>;
   }
}

export default connect(
   null,
   { stateSetKey }
)(OptionbarOptionLayer);
