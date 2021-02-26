import React, { useState, useEffect } from "react";

import InputSelect from "/components/inputs/input-select.jsx";
import InputCheckbox from "/components/inputs/input-checkbox.jsx";

import LAYERS from "/utils/dbs/LAYERS.js";
import editableTiles from "/utils/dbs/editable-tiles.js";
import editableWalls from "/utils/dbs/editable-walls.js";

const tiles = Object.entries(editableTiles).map(([id, name]) => [name, parseInt(id)]);
const walls = Object.entries(editableWalls).map(([id, name]) => [name, parseInt(id)]);
const tilesOrdered = [...tiles].sort((a,b) => a[0].localeCompare(b[0]));
const wallsOrdered = [...walls].sort((a,b) => a[0].localeCompare(b[0]));
const wires = ["red", "green", "blue", "yellow"];
const liquids = ["water", "lava", "honey"];

function OptionbarOptionId({ state, setState }) {
   const onChangeId = (id) => {
      setState({...state, id});
   }

   useEffect(() => {
      if (state.id === null) {
         switch(state.layer) {
            case LAYERS.TILES:
               setState({ ...state, id: state.ordered ? tilesOrdered[0][1] : tiles[0][1] });
               break;
            case LAYERS.WALLS:
               setState({ ...state, id: state.ordered ? wallsOrdered[0][1] : walls[0][1] });
               break;
            case LAYERS.WIRES:
               setState({ ...state, id: wires[0] });
               break;
            case LAYERS.LIQUIDS:
               setState({ ...state, id: liquids[0] });
               break;

            default:
               setState({ ...state, layer: LAYERS.TILES });
         }
      }
   }, [state.layer]);

   const [IdInputByLayer, setIdInputByLayer] = useState(null);

   useEffect(() => {
      switch(state.layer) {
         case LAYERS.TILES:
            setIdInputByLayer(<InputSelect label="Tile" options={state.ordered ? tilesOrdered : tiles} value={state.id + ""} onChange={onChangeId}/>);
            break;
         case LAYERS.WALLS:
            setIdInputByLayer(<InputSelect label="Wall" options={state.ordered ? wallsOrdered : walls} value={state.id} onChange={onChangeId}/>);
            break;
         case LAYERS.WIRES:
            setIdInputByLayer(<InputSelect label="Wire" options={wires} value={state.id} onChange={onChangeId}/>);
            break;
         case LAYERS.LIQUIDS:
            setIdInputByLayer(<InputSelect label="Liquid type" options={liquids} value={state.id} onChange={onChangeId}/>);
            break;
      }
   }, [state.id, state.ordered, state.size, state.locked])

   return (
      <>
         {
            IdInputByLayer
         }
         {
            (state.layer == LAYERS.TILES || state.layer == LAYERS.WALLS) &&
            <>
               <div className="input-label">Order by</div>
               <InputCheckbox label="ID" value={!state.ordered} onChange={() => setState({ ...state, ordered: false })}/>
               <InputCheckbox label="Name" value={state.ordered} onChange={() => setState({ ...state, ordered: true })}/>
            </>
         }
      </>
   )
}

export default OptionbarOptionId;
