import React from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import NPCs from "/utils/dbs/NPCs.js";
import sprite, { NPCsSprites } from "/utils/dbs/sprites.js";
import { FindIcon } from "/components/icon.jsx";
import "/components/styles/sidebar/views/NPCs.css";

const NPCTypeNames = [];
NPCs.town.forEach(({id, typeName}) => { NPCTypeNames[id] = typeName });
NPCs.pillars.forEach(({id, typeName}) => { NPCTypeNames[id] = typeName });

function SidebarNPCs({ stateChange, NPCs }) {
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
            NPCs.map(NPC => (
               <div className="sidebar-view-npcs-row">
                  <div className="sidebar-view-npcs-row-avatar">{NPCTypeNames[NPC.id]}</div>
                  <div className="sidebar-view-npcs-row-type">{NPCTypeNames[NPC.id]}</div>
               </div>
            ))
         }
      </>
   );
}

export default connect(
   state => {
      return {
         NPCs: state.canvas.worldObject.NPCs
      };
   },
   { stateChange }
)(SidebarNPCs);
