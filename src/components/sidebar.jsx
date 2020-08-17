import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import SidebarViewGeneral from "/components/sidebar/views/general.jsx";
import SidebarViewLayers from "/components/sidebar/views/layers.jsx";
import SidebarViewTileInfo from "/components/sidebar/views/tileInfo.jsx";
import "/components/styles/sidebar.css";

const config = [
   {
      label: "General",
      View: SidebarViewGeneral,
   },
   {
      label: "Layers",
      View: SidebarViewLayers
   },/*
   {
      label: "Tile Info",
      View: SidebarViewTileInfo
   }*/
];

function Sidebar({ show, running, tool }) {
   const [currentTab, setCurrentTab] = useState(0);
   const View = config[currentTab].View;

   const onTabClick = (index) => {
      setCurrentTab(index);
   }

   useEffect(() => {
      if (tool == "tileInfo")
         setCurrentTab(2);
   }, [tool]);

   if (show)
      return (
         <div className="sidebar-container">
            <div className="sidebar-tabs">
               {
                  config.map(({ label }, i) =>
                     <div className={"sidebar-tabs-option-container" + (i == currentTab ? " sidebar-tabs-option-container--active" : "")} onClick={() => { onTabClick(i) }} key={i}>
                        <div className="sidebar-tabs-option">{label}</div>
                     </div>
                  )
               }
            </div>
            <div className="sidebar-view-container">
               {
                  running &&
                  <View/>
               }
            </div>
         </div>
      );
   else
      return "";
}

export default connect(state => {
   return {
      show: state.view.sidebar,
      running: state.canvas.running,
      tool: state.toolbar.tool
   }
})(Sidebar);
