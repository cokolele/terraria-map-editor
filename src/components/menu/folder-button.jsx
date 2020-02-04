import React from "react";

import "/components/styles/menu/folder-button.css";

function MenuFolderButton({ label, onClick, Icon }) {
   return (
      <div className="menu-folder-container menu-folder-button" onClick={onClick}>
         <span>{label}</span>
         <Icon size="auto"/>
      </div>
   )
}

export default MenuFolderButton;
