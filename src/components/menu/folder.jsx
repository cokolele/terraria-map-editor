import React, { useEffect } from "react";
import useToggle from "/utils/hooks/useToggle.js";

import MenuFolderOption from "/components/menu/folder/option.jsx";
import "/components/styles/menu/folder.css";

function MenuFolder({ label, options, currentTab, setCurrentTab, index, toggleViewOption }) {
   const [showDropdown, toggleDropdown] = useToggle(false, true);

   const onClick = e => {
      if (e.target.classList.contains("menu-folder") || e.target.classList.contains("menu-option-divider") || e.target.classList.contains("menu-option--disabled") || e.target.classList.contains("menu-option--menu"))
         return;

      toggleDropdown();
      setCurrentTab(currentTab == index ? false : index);
   }

   const onBlur = e => {
      if (showDropdown)
         toggleDropdown();

      if (e.relatedTarget === null)
         setCurrentTab(false);
   }

   const onMouseEnter = () => {
      if (currentTab !== false && currentTab != index) {
         toggleDropdown();
         setCurrentTab(index);
      }
   }

   useEffect(() => {
      if (currentTab !== index && showDropdown)
         toggleDropdown();
   }, [currentTab]);

   const hasMenuOption = Object.values(options).some(option => (option.type && option.type == "menu"));

   return (
      <div className={"menu-folder-container" + (showDropdown ? " menu-folder-container--opened" : "")} onClick={onClick} onBlur={onBlur} onMouseEnter={onMouseEnter} tabIndex={index}>
         {label}
         {
            showDropdown &&
            <div className={"menu-folder" + (hasMenuOption ? " menu-folder--hasMenu" : "")}>
            {
               Object.keys(options).map((key, i) => <MenuFolderOption label={key} option={options[key]} key={i}/>)
            }
            </div>
         }
      </div>
   )
}

export default MenuFolder;
