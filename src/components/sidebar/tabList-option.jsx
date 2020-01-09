import React from "react";

import "/components/styles/sidebar/tabList-option.css";

function SidebarTabListOption({ label, active, index, onClick }) {
   const _onClick = () => {
      onClick(index);
   }

   return (
      <div className={"sidebar-tabList-option-container" + (active ? " sidebar-tabList-option-container--active" : "")}
            onClick={_onClick}>
         <div className="sidebar-tabList-option">{label}</div>
      </div>
   )
}

export default SidebarTabListOption;
