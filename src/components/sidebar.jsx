import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import config from "/app/sidebar.js";
import { refreshCanvasSize } from "/app/canvas/main.js";

import SidebarFolderOption from "/components/sidebar-folder-option.jsx";

import "./sidebar.css";

function Sidebar({ show }) {
   useEffect(() => {
      refreshCanvasSize()
   }, [show]);

   const [currentTab, setCurrentTab] = useState(0);

   const onTabClick = (e, i) => {
      setCurrentTab(i);
   }

   if (show)
      return (
         <div className="sidebar-container">
            <div className="sidebar-folders">
               {
                  Object.keys(config).map((key, i) =>
                     <SidebarFolderOption label={key} key={i} index={i} active={i == currentTab ? true : false} onClick={onTabClick}/>
                  )
               }
            </div>
         </div>
      )
   else
      return "";
}

export default connect(state => {
   return {
      show: state.menu.view.sidebar
   }
})(Sidebar);
