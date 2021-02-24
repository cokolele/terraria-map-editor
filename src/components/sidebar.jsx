import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { stateChange } from "src/state/state.js";

import { CrossIcon } from "src/components/icon.jsx";

import AppbarButton from "src/components/appbar/button.jsx";
import SidebarViewGeneral from "src/components/sidebar/views/general.jsx";
import SidebarViewLayers from "src/components/sidebar/views/layers.jsx";
import SidebarViewTileInfo from "src/components/sidebar/views/tileInfo.jsx";
import SidebarViewNPCs from "src/components/sidebar/views/NPCs.jsx";
import "src/components/styles/sidebar.css";

const config = [
   {
      label: "General",
      View: SidebarViewGeneral,
   },
   {
      label: "Layers",
      View: SidebarViewLayers
   },
   /*{
      label: "Tile Info",
      View: SidebarViewTileInfo
   },*/
   {
      label: "NPCs",
      View: SidebarViewNPCs
   }
];

function Sidebar({ show, running, tool, drawer, mobile, stateChange }) {
   const [currentTab, setCurrentTab] = useState(0);
   const View = config[currentTab].View;

   const onTabClick = (index) => {
      setCurrentTab(index);
   }

   const onMobileCloseClick = () => {
      stateChange(["appbar", "drawer"], null);
   }

   useEffect(() => {
      if (tool == "tileInfo")
         setCurrentTab(2);
   }, [tool]);

   if (show)
      return (
         <div className={"sidebar-container" + (drawer == "sidebar" ? " drawer" : "")}>
            {
               mobile &&
               <div className="appbar-container">
                  <div className="appbar">
                     <AppbarButton Icon={CrossIcon} onClick={onMobileCloseClick}/>
                  </div>
               </div>
            }
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

export default connect(
   state => {
      return {
         show: state.view.sidebar,
         running: state.canvas.running,
         tool: state.toolbar.tool,
         drawer: state.appbar.drawer,
         mobile: state.mobile
      };
   },
   { stateChange }
)(Sidebar);
