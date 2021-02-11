import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import NPCs from "/utils/dbs/NPCs.js";
import sprite, { spriteUrl, NPCsSprites } from "/utils/dbs/sprites.js";
import { FindIcon } from "/components/icon.jsx";
import OptionbarInputSelect from "/components/inputs/input-select.jsx";
import OptionbarInputButton from "/components/inputs/input-button.jsx";
import OptionbarInput from "/components/inputs/input.jsx";
import { CSSTransition } from "react-transition-group";
import "/components/styles/sidebar/views/NPCs.css";

function SidebarNPCs({ stateChange, stateNPCs, headerSpawnPoint }) {
   let addOptions = { ...NPCs };
   stateNPCs.forEach(stateNPC => delete addOptions[stateNPC.id]);
   addOptions = Object.entries(addOptions).map(([id, NPC]) => [NPC.typeName, id]);

   const [selectedAddNPC, setSelectedAddNPC] = useState(addOptions.length ? parseInt(addOptions[0][1]) : null);
   const [selectedEditNPC, setSelectedEditNPC] = useState(null);

   const onAddNPC = () => {
      if (!addOptions.length) {
         setSelectedAddNPC("");
         return;
      }
      else if (addOptions[0][1] != selectedAddNPC)
         setSelectedAddNPC(addOptions[0][1]);
      else if (addOptions[1])
         setSelectedAddNPC(addOptions[1][1]);
      else
         setSelectedAddNPC("");

      switch (NPCs[selectedAddNPC].typeName) {
         case "Goblin Tinkerer":
            stateChange(["canvas", "worldObject", "header", "savedGoblin"], true);
            break;
         case "Wizard":
            stateChange(["canvas", "worldObject", "header", "savedWizard"], true);
            break;
         case "Mechanic":
            stateChange(["canvas", "worldObject", "header", "savedMech"], true);
            break;
         case "Angler":
            stateChange(["canvas", "worldObject", "header", "savedAngler"], true);
            break;
         case "Stylist":
            stateChange(["canvas", "worldObject", "header", "savedStylist"], true);
            break;
         case "Tax Collector":
            stateChange(["canvas", "worldObject", "header", "savedTaxCollector"], true);
            break;
         case "Golfer":
            stateChange(["canvas", "worldObject", "header", "savedGolfer"], true);
            break;
         case "Tavernkeep":
            stateChange(["canvas", "worldObject", "header", "savedBartender"], true);
            break;
         case "Cat":
            stateChange(["canvas", "worldObject", "header", "boughtCat"], true);
            break;
         case "Dog":
            stateChange(["canvas", "worldObject", "header", "boughtDog"], true);
            break;
         case "Bunny":
            stateChange(["canvas", "worldObject", "header", "boughtBunny"], true);
            break;
      }

      let name;
      if (NPCs[selectedAddNPC]?.names)
         if (typeof NPCs[selectedAddNPC].names[0] == "string")
            name = NPCs[selectedAddNPC].names[Math.floor(Math.random() * NPCs[selectedAddNPC].names.length)];
         else
            name = NPCs[selectedAddNPC].names[0][Math.floor(Math.random() * NPCs[selectedAddNPC].names.length)];

      stateChange(["canvas", "worldObject", "NPCs", stateNPCs.length], {
         id: selectedAddNPC,
         name,
         position: {
            x: headerSpawnPoint[0] * 16,
            y: (headerSpawnPoint[1] - 3) * 16
         },
         homePosition: {
            x: headerSpawnPoint[0],
            y: headerSpawnPoint[1]
         },
         homeless: true,
         variationIndex: 0,
         townNPC: NPCs[selectedAddNPC]?.town,
         pillar: NPCs[selectedAddNPC]?.pillar
      });
   }

   return (
      <>
         <div className="sidebar-view-npcs-row">
            <OptionbarInputSelect
               label="Choose an NPC to add"
               options={addOptions}
               value={selectedAddNPC}
               onChange={id => setSelectedAddNPC(parseInt(id))}
            />
            <div className="flex-filler"></div>
            <OptionbarInputButton
               label="+"
               onClick={onAddNPC}
            />
         </div>
         {
            [...stateNPCs].reverse().map((stateNPC, i) => (
               <React.Fragment key={stateNPCs.length - 1 - i}>
                  <div className="sidebar-view-npcs-row" onClick={() => { selectedEditNPC == stateNPCs.length - 1 - i ? setSelectedEditNPC(null) : setSelectedEditNPC(stateNPCs.length - 1 - i)}}>
                     <SidebarNPCAvatar id={stateNPC.id} variation={stateNPC.variationIndex}/>
                     <div className="sidebar-view-npcs-row-type">{NPCs[stateNPC.id].typeName}</div>
                     {
                        stateNPC.name &&
                        <div className="sidebar-view-npcs-row-name">{stateNPC.name}</div>
                     }
                  </div>
                  <CSSTransition
                     in={
                        false
                        //selectedEditNPC == stateNPCs.length - 1 - i
                     }
                     timeout={400}
                     onEnter={el => el.style.maxHeight = "0px"}
                     onEntering={el => el.style.maxHeight = el.scrollHeight + "px"}
                     onExit={el => el.style.maxHeight = el.scrollHeight + "px"}
                     onExiting={el => el.style.maxHeight = "0px"}
                     unmountOnExit
                  >
                     <div className="sidebar-view-npcs-row-details">
                        {JSON.stringify(stateNPCs[stateNPCs.length - 1 - i])}
                     </div>
                  </CSSTransition>
               </React.Fragment>
            ))
         }
      </>
   );
}

function SidebarNPCAvatar({ id, variation }) {
   let dimensions;

   if (!NPCsSprites[id])
      dimensions = NPCsSprites.unknown;
   else if (variation !== undefined && typeof NPCsSprites[id][variation] == "object")
      dimensions = NPCsSprites[id][variation];
   else
      dimensions = NPCsSprites[id];

   return (
      <div className="sidebar-view-npcs-row-avatar">
         <div style={{
            backgroundImage: "url(" + spriteUrl + ")",
            backgroundSize: sprite.width * 2.2 + "px " + sprite.height * 2.2 + "px",
            backgroundPosition: "left -" + dimensions[0] * 2.2 + "px top -" + dimensions[1] * 2.2 + "px",
            width: dimensions[2] * 2.2 + "px",
            height: dimensions[3] * 2.2 + "px",
         }}></div>
      </div>
   )
}

export default connect(
   state => {
      return {
         stateNPCs: state.canvas.worldObject.NPCs,
         headerSpawnPoint: [
            state.canvas.worldObject.header.spawnTileX,
            state.canvas.worldObject.header.spawnTileY
         ]
      };
   },
   { stateChange }
)(SidebarNPCs);
