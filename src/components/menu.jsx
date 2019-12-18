import React, { useState } from "react";

import config from "/app/menu.js";

import MenuOptionsContainer from "/components/menu-options-container.jsx";
import "./menu.css";

function Menu() {
   const [tabOpened, setTabOpened] = useState(false);

   return (
      <div className="menu-container">
         <div className="menu">
         {
            Object.keys(config).map((key, i) =>
               <MenuOptionsContainer label={key} options={config[key]} tabOpened={tabOpened} setTabOpened={setTabOpened} index={i+1} key={i+1}/>
            )
         }
         </div>
      </div>
   )
}

export default Menu;
