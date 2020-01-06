import React, { useState } from "react";

import MenuFolder from "/components/menu/folder.jsx";
import MenuFolderAccount from "/components/menu/folder-account.jsx";
import "/components/styles/menu.css";

import folders from "/app/menu.js";

function Menu() {
   const [currentTab, setCurrentTab] = useState(false);

   return (
      <div className="menu-container">
         <div className="menu">
         {
            Object.keys(folders).map((label, i) =>
               <MenuFolder label={label} options={folders[label]} currentTab={currentTab} setCurrentTab={setCurrentTab} index={i+1} key={i+1}/>
            )
         }
         </div>
         <div className="menu">
            <MenuFolderAccount/>
            <MenuFolderAccount __templink/>
         </div>
      </div>
   )
}

export default Menu;
