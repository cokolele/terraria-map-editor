import React, {  useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import NPCs from "/utils/dbs/NPCs.js";
import InputSelect from "/components/inputs/input-select.jsx";
import InputButton from "/components/inputs/input-button.jsx";
import { LocateIcon } from "/components/icon.jsx";
import useUpdateEffect from "/utils/hooks/useUpdateEffect.js";
import Main from "/canvas/main.js";

const NPCNames = [];
NPCs.town.forEach(({id, typeName}) => { NPCNames[id] = typeName });
NPCs.pillars.forEach(({id, typeName}) => { NPCNames[id] = typeName });

function OptionbarOptionWorldPoint({ stateChange, state, setState, stateNPCs, header, onCanvasClick }) {
   useUpdateEffect(() => {
      switch (state.worldPoint) {
         case 0:
            stateChange(["canvas", "worldObject", "header"], {
               ...header,
               spawnTileX: Main.mousePosImageX,
               spawnTileY: Main.mousePosImageY
            });
            break;
         case 1:
            stateChange(["canvas", "worldObject", "header"], {
               ...header,
               dungeonX: Main.mousePosImageX,
               dungeonY: Main.mousePosImageY
            });
            break;
         default:
            stateNPCs.forEach(stateNPC => {
               if (stateNPC.id == state.worldPoint) {
                  stateNPC.position = {
                     x: Main.mousePosImageX * 16,
                     y: Main.mousePosImageY * 16
                  }
                  if (stateNPC.homePosition)
                     stateNPC.homePosition = {
                        x: Main.mousePosImageX,
                        y: Main.mousePosImageY
                     };
               }
            });
            stateChange(["canvas", "worldObject", "NPCs"], [ ...stateNPCs ]);
            break;
      }
   }, [onCanvasClick]);

   const worldPoints = [
      ["Spawn point", header.spawnTileX, header.spawnTileY],
      ["Dungeon point", header.dungeonX, header.dungeonY]
   ];

   stateNPCs.forEach(stateNPC => {
      if (stateNPC.homePosition)
         worldPoints[stateNPC.id] = [NPCNames[stateNPC.id], stateNPC.homePosition.x, stateNPC.homePosition.y];
      else
         worldPoints[stateNPC.id] = [NPCNames[stateNPC.id], stateNPC.position.x/16, stateNPC.position.y/16];
   })

   useEffect(() => {
      if (state.worldPoint === undefined || worldPoints[state.worldPoint] === undefined)
         setState({ ...state, worldPoint: 0});
   }, []);

   const onLocateClick = () => {
      Main.extensions.zoom.set( Main.extensions.zoom.info().zoomFactors.length - 10 );
      Main.extensions.zoom.center(worldPoints[state.worldPoint][1], worldPoints[state.worldPoint][2]);
   }

   return (
      <>
         <InputSelect label="World point" options={worldPoints.map((point, i) => [point[0], i])} value={state.worldPoint} onChange={(worldPoint) => {setState({ ...state, worldPoint: parseInt(worldPoint) })}}/>
         <InputButton label="Locate" onClick={onLocateClick} IconLeft={LocateIcon}/>
      </>
   );
}

export default connect(
   state => {
      return {
         stateNPCs: state.canvas.worldObject.NPCs,
         header: state.canvas.worldObject.header,
         onCanvasClick: state.canvas.events.click
      };
   },
   { stateChange }
)(OptionbarOptionWorldPoint);
