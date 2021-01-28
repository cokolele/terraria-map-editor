import React, {  useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";
import { store } from "/state/store.js";

import NPCs from "/utils/dbs/NPCs.js";
import InputSelect from "/components/inputs/input-select.jsx";
import InputButton from "/components/inputs/input-button.jsx";
import { LocateIcon } from "/components/icon.jsx";
import useUpdateEffect from "/utils/hooks/useUpdateEffect.js";
import Main from "/canvas/main.js";

function OptionbarOptionWorldPoint({ stateChange, state, setState, stateNPCs, header, onCanvasClick }) {
   useUpdateEffect(() => {
      switch (state.worldPoint) {
         case "Spawn point":
            header.spawnTileX = Main.mousePosImageX;
            header.spawnTileY = Main.mousePosImageY;
            stateChange(["canvas", "worldObject", "header"], { ...header });
            break;
         case "Dungeon point":
            header.dungeonX = Main.mousePosImageX;
            header.dungeonY = Main.mousePosImageY;
            stateChange(["canvas", "worldObject", "header"], { ...header });
            break;
         default:
            //npc
            if (typeof state.worldPoint == "string") {
               let selectedNPCId;
               for (let [id, NPC] of Object.entries(NPCs))
                  if (state.worldPoint == NPC.typeName)
                     selectedNPCId = id;

               if (selectedNPCId) {
                  const selectedStateNPC = stateNPCs.find(stateNPC => stateNPC.id == selectedNPCId);
                  selectedStateNPC.position = {
                     x: Main.mousePosImageX * 16,
                     y: Main.mousePosImageY * 16
                  }
                  if (selectedStateNPC.homePosition) {
                     selectedStateNPC.homePosition = {
                        x: Main.mousePosImageX,
                        y: Main.mousePosImageY
                     };
                  }
                  stateChange(["canvas", "worldObject", "NPCs"], [ ...stateNPCs ]);
               }
            }
            //input point
            else {
               state.worldPoint.onLocation(Main.mousePosImageX, Main.mousePosImageY);
            }

      }
   }, [onCanvasClick]);

   const worldPoints = {
      "Spawn point": [header.spawnTileX, header.spawnTileY],
      "Dungeon point": [header.dungeonX, header.dungeonY]
   };

   stateNPCs.forEach(({ id, position, homePosition }) => {
      if (homePosition)
         worldPoints[ NPCs[id].typeName ] = [homePosition.x, homePosition.y];
      else
         worldPoints[ NPCs[id].typeName ] = [position.x/16, position.y/16];
   });

   useEffect(() => {
      if (typeof state.worldPoint == "string")
         if (!Object.keys(worldPoints).includes(state.worldPoint))
            setState({ ...state, worldPoint: "Spawn point"});
   }, []);

   const onLocateClick = () => {
      if (typeof state.worldPoint == "string") {
         Main.extensions.zoom.set( Main.extensions.zoom.info().zoomFactors.length - 10 );
         Main.extensions.zoom.center(worldPoints[state.worldPoint][0], worldPoints[state.worldPoint][1]);
      }
   }

   return (
      <>
         <InputSelect label="World point" options={Object.keys(worldPoints)} value={typeof state.worldPoint == "string" ? state.worldPoint : state.worldPoint.locationName} onChange={(worldPoint) => {setState({ ...state, worldPoint })}}/>
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
