import React, { useEffect } from "react";
import useToggle from "/utils/hooks/useToggle.js";

import "./menu-options.css";

function MenuOptions({ label, options, tabOpened, setTabOpened, index }) {
   const [showDropdown, toggleDropdown] = useToggle(false, true);

   const onClick = e => {
      if (e.target.classList.contains("menu-options") || e.target.classList.contains("menu-option-divider")) //click on divider or border
         return;

      toggleDropdown();
      setTabOpened(tabOpened == index ? false : index);
   }

   const onBlur = e => {
      if (showDropdown)
         toggleDropdown();

      if (e.relatedTarget === null)
         setTabOpened(false);
   }

   const onMouseEnter = () => {
      if (tabOpened !== false && tabOpened != index) {
         toggleDropdown();
         setTabOpened(index);
      }
   }

   useEffect(() => {
      if (tabOpened !== index && showDropdown)
         toggleDropdown();
   }, [tabOpened]);

   return (
      <div className={showDropdown ? "menu-options-container--opened" : "menu-options-container"} onClick={onClick} onBlur={onBlur} onMouseEnter={onMouseEnter} tabIndex={index}>
         <span className="menu-options-label">{label}</span>
         {
            showDropdown &&
            <div className="menu-options">
            {
               Object.keys(options).map((label, i) => {
                  if (options[label] == "__DIVIDER__")
                     return <div className="menu-option-divider" key={i}></div>
                  else
                     return <div className="menu-option" key={i} onClick={options[label]}>{label}</div>
               })
            }
            </div>
         }
      </div>
   )
}

export default MenuOptions;
