import React, { useState, useEffect } from "react";

import menuOptionsConfig from "/app/menu.js";

import MenuOptions from "/components/menu-options.jsx";

import "./menu.css";

function Menu() {
   const [tabOpened, setTabOpened] = useState(false);

   return (
      <div className="menu-container">
         <div className="menu">
         {
            Object.keys(menuOptionsConfig).map((key, i) =>
               <MenuOptions label={key} options={menuOptionsConfig[key]} tabOpened={tabOpened} setTabOpened={setTabOpened} index={i} key={i}/>
            )
         }
         </div>
      </div>
   )
}

export default Menu;
