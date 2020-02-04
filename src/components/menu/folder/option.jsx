import React from "react";
import useToggle from "/utils/hooks/useToggle.js";

import "/components/styles/menu/folder/option.css";

function MenuFolderOption({ label, option, state }) {
   if (label == "DIVIDER")
      return <div className="menu-option-divider"></div>

   if (typeof option == "function")
      return <div className="menu-option" onClick={option}>{label}</div>

   if (option.type == "default") {
      const _onClick = (e) => {
         if (option.enabled)
            option.onClick();
      }

      return <div className={"menu-option" + (option.enabled ? "" : " menu-option--disabled")} onClick={_onClick}>{label}</div>
   }

   if (option.type == "checkbox") {
      const _onClick = (e) => {
         option.onClick(!option.checked);
      }

      return <div className={"menu-option" + (option.checked ? " menu-option--checked" : "")} onClick={_onClick}>{label}</div>
   }
}

export default MenuFolderOption;
