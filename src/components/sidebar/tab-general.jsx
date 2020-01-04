import React from "react";

import SidebarInputInline from "/components/sidebar/input-inline.jsx";
const Divider = () => <div className="sidebar-inputs-divider"></div>;

const config = [
   ["World name",             "%$mapName"],
   ["World id",               "$worldId"],
   ["Seed",                   "$seedText"],
   ["World size (blocks)",    "%$maxTilesX x %$maxTilesY"],
   ["World size (pixels)",    "%$rightWorld x %$bottomWorld"],
   ["Spawn point",            "X: %$spawnTileX Y: %$spawnTileY"],
   ["Dungeon point",          "X: %$dungeonX Y: %$dungeonY"],
   ["__DIVIDER__"],
   ["Expert mode",            "&$expertMode"],
   ["Hard mode",              "&$hardMode"],
   ["Crimson",                "&$crimson"],
];

function TabGeneral({ worldObject }) {
   return <div>
   {
      config.map(([label, value], i) => {
         if (label == "__DIVIDER__"){
            return <Divider key={i}/>;
         }

         if (typeof value == "string") {

         }
      })
   }
   </div>
}

export default TabGeneral;
