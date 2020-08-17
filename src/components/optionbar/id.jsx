import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";
import { localSettings, saveToLocalSettings } from "/utils/localStorage.js";

import InputSelect from "/components/inputs/input-select.jsx";
import InputCheckbox from "/components/inputs/input-checkbox.jsx";

import LAYERS from "/utils/dbs/LAYERS.js";
import editableTiles from "/utils/dbs/editable-tiles.js";
import editableWalls from "/utils/dbs/editable-walls.js";

const tiles = Object.entries(editableTiles).map(([id, name]) => [name, id]);
const walls = Object.entries(editableWalls).map(([id, name]) => [name, id]);
const tilesOrdered = [...tiles].sort((a,b) => a[0].localeCompare(b[0]));
const wallsOrdered = [...walls].sort((a,b) => a[0].localeCompare(b[0]));
const wires = ["red", "green", "blue", "yellow"];
const liquids = ["water", "lava", "honey"];

function OptionbarOptionId({ stateChange, id, LAYER }) {
   const [ordered, setOrdered] = useState(localSettings.default("optionbarIdOrdered", false));

   const onChange = (id) => {
      if (LAYER == LAYERS.TILES || LAYER == LAYERS.WALLS)
         id = parseInt(id);
      stateChange(["optionbar", "id"], id);
   }

   const onChangeOrdered = (ordered) => {
      setOrdered(ordered);
      saveToLocalSettings("optionbarIdOrdered", ordered);
   }

   useEffect(() => {
      switch(LAYER) {
         case LAYERS.TILES:
            if (ordered)
               stateChange(["optionbar", "id"], tilesOrdered[0][1]);
            else
               stateChange(["optionbar", "id"], tiles[0][1]);
            break;
         case LAYERS.WALLS:
            if (ordered)
               stateChange(["optionbar", "id"], wallsOrdered[0][1]);
            else
               stateChange(["optionbar", "id"], walls[0][1]);
            break;
         case LAYERS.WIRES:
            stateChange(["optionbar", "id"], wires[0]);
            break;
         case LAYERS.LIQUIDS:
            stateChange(["optionbar", "id"], liquids[0]);
            break;
      }
   }, [LAYER, ordered]);

   let IdInputByLayer;
   switch(LAYER) {
      case LAYERS.TILES:
         if (ordered)
            IdInputByLayer = <InputSelect label="Tile" options={tilesOrdered} value={id} onChange={onChange}/>;
         else
            IdInputByLayer = <InputSelect label="Tile" options={tiles} value={id} onChange={onChange}/>;
         break;
      case LAYERS.WALLS:
         if (ordered)
            IdInputByLayer = <InputSelect label="Wall" options={wallsOrdered} value={id} onChange={onChange}/>;
         else
            IdInputByLayer = <InputSelect label="Wall" options={walls} value={id} onChange={onChange}/>;
         break;
      case LAYERS.WIRES:
         IdInputByLayer = <InputSelect label="Wire" options={wires} value={id} onChange={onChange}/>;
         break;
      case LAYERS.LIQUIDS:
         IdInputByLayer = <InputSelect label="Liquid type" options={liquids} value={id} onChange={onChange}/>;
         break;
   }

   return (
      <>
         {
            IdInputByLayer
         }
         {
            (LAYER == LAYERS.TILES || LAYER == LAYERS.WALLS) &&
            <>
               <div className="input-label">Order by</div>
               <InputCheckbox label="ID" value={!ordered} onChange={() => {onChangeOrdered(false)}}/>
               <InputCheckbox label="Name" value={ordered} onChange={() => {onChangeOrdered(true)}}/>
            </>
         }
      </>
   )
}

export default connect(
   state => {
      return {
         LAYER: state.optionbar.layer,
         id: state.optionbar.id
      };
   },
   { stateChange }
)(OptionbarOptionId);
