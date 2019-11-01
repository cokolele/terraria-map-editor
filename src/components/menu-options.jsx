import React, { useEffect } from "react";
import useToggle from "/utils/hooks/useToggle.js";

import "./menu-options.css";

function MenuOptions({ label, options, tabOpened, setTabOpened, index }) {
   const [showDropdown, toggleDropdown] = useToggle(false, true);

   const onClick = e => {
      if (e.target.classList.contains("menu-options-container")) //click on divider or border
         return;

      toggleDropdown();
      setTabOpened(tabOpened == index ? false : index);
   }

   const onBlur = () => {
      if (showDropdown) {
         toggleDropdown();
         setTabOpened(false);
      }
   }

   const onMouseEnter = () => {
      if (tabOpened !== false && tabOpened != index) {
         toggleDropdown();
         setTabOpened(index);
      }
   }

   useEffect(() => {
      if (tabOpened !== false && tabOpened != index && showDropdown)
         toggleDropdown();
   }, [tabOpened]);

   return (
      <div className={showDropdown ? "menu-options--opened" : "menu-options"} onClick={onClick} onBlur={onBlur} onMouseEnter={onMouseEnter} tabIndex={index}>
         <span className="menu-options-label">{label}</span>
         <div className="menu-options-fix">
         {
            showDropdown &&
            <div className="menu-options-container">
            {
               options.map((option, i) => {
                  if (option == "__DIVIDER__")
                     return <div className="menu-option-divider" key={i}></div>
                  else
                     return <div className="menu-option" key={i} onClick={option.optionFunc}>{option.optionLabel}</div>
               })
            }
            </div>
         }
         </div>
      </div>
   )
}

export default MenuOptions;
