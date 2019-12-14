import React, { useState } from "react";
import useToggle from "/utils/hooks/useToggle.js";

import { connect } from "react-redux";

import "./menu-option.css";

function MenuOption({ label, option, state }) {
   if (label == "DIVIDER")
      return <div className="menu-option-divider"></div>

   if (typeof option == "function")
      return <div className="menu-option" onClick={option}>{label}</div>

   if (option.type == "checkbox") {
      const initChecked = state[option.for[0]][option.for[1]];
      const [checked, toggleCheck] = initChecked ? useToggle(true, false) : useToggle(false, true);

      const onCheckboxClick = () => {
         toggleCheck();
         option.onClick();
      }

      return <div className={"menu-option" + (checked ? " menu-option--checked" : "")} onClick={onCheckboxClick}>{label}</div>
   }
}

export default connect(state => {
   return {
      state: state.menu
   }
})(MenuOption);
