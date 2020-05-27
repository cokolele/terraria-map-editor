import React, { useState } from "react";
import useToggle from "/utils/hooks/useToggle.js";

import "/components/styles/menu/folder/option.css";

function MenuFolderOption({ label, option, state }) {
   if (label == "DIVIDER")
      return <div className="menu-option-divider"></div>

   if (typeof option == "function")
      return <div className="menu-option" onClick={option}>{label}</div>

   if (option.type == "default") {
      const onClick = (e) => {
         if (option.enabled)
            option.onClick();
      }

      return <div className={"menu-option" + (option.enabled ? "" : " menu-option--disabled")} onClick={onClick}>{label}</div>
   }

   if (option.type == "checkbox") {
      const onClick = (e) => {
         option.onClick(!option.checked);
      }

      return <div className={"menu-option" + (option.checked ? " menu-option--checked" : "")} onClick={onClick}>{label}</div>
   }

   if (option.type == "menu") {
      const [opened, setOpened] = useState(false);
      const hasMenuOption = Object.values(option.menu).some(option => (option.type && option.type == "menu"));

      return (
         <div className="menu-option menu-option--menu" onMouseEnter={() => {setOpened(true)}} onMouseLeave={() => {setOpened(false)}}>
            {label}
            {
               opened &&
               <div className={"menu-folder menu-folder--nested" + (hasMenuOption ? " menu-folder--hasMenu" : "")}>
               {
                  Object.keys(option.menu).map((key, i) => <MenuFolderOption label={key} option={option.menu[key]} key={i}/>)
               }
               </div>
            }
         </div>
      )
   }
}

export default MenuFolderOption;
