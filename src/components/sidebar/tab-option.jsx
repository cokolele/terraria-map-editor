import React from "react";

import "/components/styles/sidebar/tab-option.css";

function SidebarTabOption({ label, active, index, onClick }) {
   return (
      <div className={"sidebar-tab-option-container" + (active ? " sidebar-tab-option-container--active" : "")}
            onClick={(e) => onClick(e, index)}>
         <div className="sidebar-tab-option">{label}</div>
      </div>
   )
}

export default SidebarTabOption;
