import React from "react";
import useToggle from "/utils/hooks/useToggle.js";

import "/components/styles/menu-option.css";

function MenuOption({ label, option, state }) {
   if (label == "DIVIDER")
      return <div className="menu-option-divider"></div>

   if (typeof option == "function")
      return <div className="menu-option" onClick={option}>{label}</div>

   if (option.type == "checkbox") {
      // checkbox state is kept in prop instead of useToggle because state resets every unmount
      if (option.value === undefined)
         option.value = option.default;

      const onCheckboxClick = () => {
         option.value = !option.value;
         option.onClick(option.value);
      }

      return <div className={"menu-option" + (option.value ? " menu-option--checked" : "")} onClick={onCheckboxClick}>{label}</div>
   }
}

export default MenuOption;
