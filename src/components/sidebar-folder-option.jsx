import React from "react";

import "./sidebar-folder-option.css";

function SidebarFolderOption({ label, active, index, onClick }) {
   return (
      <div className={"sidebar-folder-option-container" + (active ? " sidebar-folder-option-container--active" : "")}
            onClick={(e) => onClick(e, index)}>
         <div className="sidebar-folder-option">{label}</div>
      </div>
   )
}

export default SidebarFolderOption;
