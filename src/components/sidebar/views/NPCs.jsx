import React from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import NPCs from "/utils/dbs/NPCs.js";
import sprite, { NPCsSprites } from "/utils/dbs/sprites.js";
import { FindIcon } from "/components/icon.jsx";
import "/components/styles/sidebar/views/NPCs.css";

import InputButton from "/components/inputs/input-button.jsx";

function SidebarNPCs({ stateChange, stateNPCs }) {
   const onAddNpc = () => {
      stateChange(["toolbar", "tool"], "worldPoint");
      stateChange(["optionbar", "worldPoint"], { label: "cicek", onLocation: (x, y) => {console.log("cicek", x,y )}});
   };

   const onDeleteNpc = () => {
      stateChange(["toolbar", "tool"], "worldPoint");
      stateChange(["optionbar", "worldPoint"], { label: "cicka", onLocation: (x, y) => {console.log("cicka", x,y )}});
   };

   return (
      <>
         <div className="sidebar-view-npcs-search">
            <div className="sidebar-view-npcs-searchInput">
               <input type="text" value={"hm"} onChange={() => {}}/>
            </div>
            <div className="flex-filler"></div>
            <FindIcon size={20}/>
         </div>
         {
            stateNPCs.map((stateNPC, i) => (
               <div className="sidebar-view-npcs-row" key={i}>
                  <div className="sidebar-view-npcs-row-avatar"></div>
                  <div className="sidebar-view-npcs-row-type">{NPCs[stateNPC.id].typeName}</div>
               </div>
            ))
         }
         <InputButton label="Add" onClick={onAddNpc}/>
         <InputButton label="Delete" onClick={onDeleteNpc}/>
      </>
   );
}

export default connect(
   state => {
      return {
         stateNPCs: state.canvas.worldObject.NPCs
      };
   },
   { stateChange }
)(SidebarNPCs);
