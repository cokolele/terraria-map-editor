import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import SidebarTabListOption from "/components/sidebar/tabList-option.jsx";
import SidebarInputInline from "/components/sidebar/input-inline.jsx";
import "/components/styles/sidebar.css";
import TabGeneral from "/components/sidebar/tab-general.jsx";
import TabLayers from "/components/sidebar/tab-layers.jsx";

const config = [
   {
      label: "General",
      View: TabGeneral,
   },
   {
      label: "NPCs",
      View: TabGeneral,
   },
   {
      label: "Layers",
      View: TabLayers
   }
];

function Sidebar({ show, running }) {
   const [currentTab, setCurrentTab] = useState(0);
   const View = config[currentTab].View;

   const onTabClick = (index) => {
      setCurrentTab(index);
   }

   if (show)
      return (
         <div className="sidebar-container">
            <div className="sidebar-tabList">
               {
                  config.map((tab, i) =>
                     <SidebarTabListOption label={tab.label} key={i} index={i} active={i == currentTab} onClick={onTabClick}/>
                  )
               }
            </div>
            <div>
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
      show: state.app.view.sidebar,
      running: state.app.running
   }
})(Sidebar);
