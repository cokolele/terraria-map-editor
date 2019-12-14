import React, { useEffect } from "react";
import useToggle from "/utils/hooks/useToggle.js";

import MenuOption from "/components/menu-option.jsx";

import "./menu-options-container.css";

function MenuOptionsContainer({ label, options, tabOpened, setTabOpened, index, toggleViewOption }) {
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
      <div className={showDropdown ? "menu-options-container-wrapper--opened" : "menu-options-container-wrapper"} onClick={onClick} onBlur={onBlur} onMouseEnter={onMouseEnter} tabIndex={index}>
         <span className="menu-options-container-label">{label}</span>
         {
            showDropdown &&
            <div className="menu-options-container">
            {
               Object.keys(options).map((key, i) =>
                  <MenuOption label={key} option={options[key]} key={i}/>
               )
            }
            </div>
         }
      </div>
   )
}

export default MenuOptionsContainer;
