import React, { useState, useEffect } from "react";
import { stateChange } from "/state/state.js";
import { connect } from "react-redux";

import "/components/styles/menu/folder/option.css";

function MenuFolderOption({ label, option, state, mobile, refreshMaxHeight, stateChange }) {
   if (label == "DIVIDER")
      return <div className="menu-option-divider"></div>

   if (typeof option == "function")
      return <div className="menu-option" onClick={() => {stateChange(["appbar", "drawer"], null); option()}}>{label}</div>

   if (option.type == "default") {
      const onClick = (e) => {
         if (option.enabled) {
            stateChange(["appbar", "drawer"], null);
            option.onClick();
         }
      }

      return <div className={"menu-option" + (option.enabled ? "" : " menu-option--disabled")} onClick={onClick}>{label}</div>
   }

   if (option.type == "checkbox") {
      const onClick = (e) => {
         option.onClick(!option.checked);
      }

      return <div className={"menu-option" + (option.checked ? " menu-option--checked" : " menu-option--unchecked")} onClick={onClick}>{label}</div>
   }

   if (option.type == "menu") {
      const [opened, setOpened] = useState(false);
      const hasMenuOption = Object.values(option.menu).some(option => (option.type && option.type == "menu"));

      const onClick = () => mobile && setOpened(!opened);
      const onMouseEnter = () => !mobile && setOpened(true);
      const onMouseLeave = () => !mobile && setOpened(false);

      useEffect(refreshMaxHeight, [opened]);

      return (
         <div className={"menu-option menu-option--menu" + (opened ? " menu-option--menu-opened" : "")} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
            {label}
            {
               opened &&
               <div className={"menu-folder menu-folder--nested" + (hasMenuOption ? " menu-folder--hasMenu" : "")}>
               {
                  Object.keys(option.menu).map((key, i) => <MenuFolderOption label={key} option={option.menu[key]} key={i} refreshMaxHeight={option.menu[key].type == "menu" ? refreshMaxHeight : undefined} stateChange={stateChange}/> )
               }
               </div>
            }
         </div>
      )
   }
}

export default connect(
   state => {
      return {
         mobile: state.mobile
      };
   },
   { stateChange }
)(MenuFolderOption);
