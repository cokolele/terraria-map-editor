import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import useToggle from "/utils/hooks/useToggle.js";

import MenuFolderOption from "/components/menu/folder/option.jsx";
import "/components/styles/menu/folder.css";

function MenuFolder({ label, options, currentTab, setCurrentTab, index, toggleViewOption, mobile }) {
   //sorry
   const closeAnimationProxy = async () => {
      if (mobile && showDropdown) {
         if (folderRef.current)
            folderRef.current.style.maxHeight = 0;
         await (new Promise(r => setTimeout(r, 300)));
      }
   }
   const [showDropdown, toggleDropdown] = useToggle(false, true, closeAnimationProxy);

   const dontCloseFolderClasses = [
      "menu-folder",
      "menu-option-divider",
      "menu-option--disabled",
      "menu-option--menu"
   ];
   const onClick = e => {
      if (dontCloseFolderClasses.some(className => e.target.classList.contains(className)))
         return;

      toggleDropdown();
      setCurrentTab(currentTab == index ? false : index);
   }

   //clicked somewhere else
   const onBlur = e => {
      if (mobile)
         return;

      if (showDropdown)
         toggleDropdown();

      if (e.relatedTarget === null)
         setCurrentTab(false);
   }

   const onMouseEnter = () => {
      if (currentTab !== false && currentTab != index && !mobile) {
         toggleDropdown();
         setCurrentTab(index);
      }
   }

   //opened another folder
   useEffect(() => {
      if (currentTab !== index && showDropdown)
         toggleDropdown();
   }, [currentTab]);

   const hasMenuOption = Object.values(options).some(option => (option.type && option.type == "menu"));

   //mobile dropdown animation
   const folderRef = useRef(null);
   const refreshMaxHeight = () => {
      if (folderRef.current)
         folderRef.current.style.maxHeight = folderRef.current.scrollHeight + "px";
   }
   useEffect(refreshMaxHeight, [showDropdown]);

   return (
      <div className={"menu-folder-container" + (showDropdown ? " menu-folder-container--opened" : "")} onClick={onClick} onBlur={onBlur} onMouseEnter={onMouseEnter} tabIndex={index}>
         {label}
         {
            showDropdown &&
            <div className={"menu-folder" + (hasMenuOption ? " menu-folder--hasMenu" : "")} ref={folderRef}>
            {
               Object.keys(options).map((key, i) => <MenuFolderOption label={key} option={options[key]} key={i} refreshMaxHeight={options[key].type == "menu" ? refreshMaxHeight : undefined}/>)
            }
            </div>
         }
      </div>
   )
}

export default connect(state => {
   return {
      mobile: state.mobile
   };
})(MenuFolder);
