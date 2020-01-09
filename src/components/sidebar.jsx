import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import SidebarTabListOption from "/components/sidebar/tabList-option.jsx";
import SidebarInputInline from "/components/sidebar/input-inline.jsx";
import TabGeneral from "/components/sidebar/tab-general.jsx";
import TabLayers from "/components/sidebar/tab-layers.jsx";
import "/components/styles/sidebar.css";

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
   const [View, setView] = useState(config[0].View);

   const onTabClick = (index) => {
      setCurrentTab(index);
      setView(config[index].View);
   }

   const renderView = () => {
      const View = config[currentTab].View;
      return <View/>;
   }

   if (show)
      return (
         <div className="sidebar-container">
            <div className="sidebar-tabList">
               {
                  config.map((tab, i) =>
                     <SidebarTabListOption label={tab.label} key={i} index={i} active={i == currentTab ? true : false} onClick={onTabClick}/>
                  )
               }
            </div>
            <div>
               {
                  running &&
                  renderView()
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
