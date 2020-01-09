import React from "react";

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


function TabGeneral() {
   return (
      <div>
         {
            config.map(([label, value], i) => {
               if (label == "__DIVIDER__"){
                  return <div className="sidebar-inputs-divider" key={i}></div>;
               }

               if (typeof value == "string") {

               }
            })
         }
      </div>
   );
}

export default TabGeneral;
/*
   worldObject !== null &&
   <div className="sidebar-content">
      <TabGeneral worldObject={worldObject}/>
   {
      Object.entries(config[Object.keys(config)[currentTab]]).map(([label, value], i) => {
         if (value == "__DIVIDER__")
            return <div className="sidebar-inputs-divider" key={i}></div>

         if (typeof value == "string") {
            //dereference
            //value = value.split(" ").map(word => word.indexOf("$") == -1 ? word : worldObject.header[word.substring(word.indexOf("$") + 1)]).join(" ");
            return (
               <div className="sidebar-input-container" key={i}>
                  <div className="sidebar-input-label">{label}</div>
                  <div className="sidebar-input">
                  {
                     value.split(" ").map((word, j) => {
                        if (word.indexOf("$") == -1)
                           return <span key={i*10+j}>{word}</span>;
                        else if (word.indexOf("%") != -1)
                           return <SidebarInputInline text defaultValue={worldObject.header[word.substring(word.indexOf("$") + 1)]} key={i*10+j}/>
                        else if (word.indexOf("&") != -1)
                           return <SidebarInputInline checkbox defaultValue={worldObject.header[word.substring(word.indexOf("$") + 1)]} key={i*10+j}/>
                        else
                           return <span className="sidebar-input--readonly" key={i*10+j}>{worldObject.header[word.substring(word.indexOf("$") + 1)]}</span>
                     })
                  }
                  </div>
               </div>
            )
         }

         if (typeof value == "object") {

         }
      })
   }
   </div>
*/
