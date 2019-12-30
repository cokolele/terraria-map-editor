import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import config from "/app/sidebar.js";

import SidebarFolderOption from "/components/sidebar-folder-option.jsx";
import Input from "/components/input.jsx";
import TabGeneral from "/components/sidebar/tab-general.jsx";
import "/components/styles/sidebar.css";


function Sidebar({ show, worldObject }) {
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
            {
               worldObject !== null &&
               <div className="sidebar-content">
                  <TabGeneral worldObject={worldObject}/>
               {
                  Object.entries(config[Object.keys(config)[currentTab]]).map(([label, value], i) => {
                     if (value == "__DIVIDER__")
                        return <div className="sidebar-inputs-divider" key={i}></div>

                     if (typeof value == "string") {
                        //dereference
                        //value = value.split(" ").map(word => word.indexOf("$") == -1 ? word : worldObject.header[word.substring(word.indexOf("$") + 1)]).join(" ");
                        return (
                           <div className="sidebar-input-container" key={i}>
                              <div className="sidebar-input-label">{label}</div>
                              <div className="sidebar-input">
                              {
                                 value.split(" ").map((word, j) => {
                                    if (word.indexOf("$") == -1)
                                       return <span key={i*10+j}>{word}</span>;
                                    else if (word.indexOf("%") != -1)
                                       return <Input text defaultValue={worldObject.header[word.substring(word.indexOf("$") + 1)]} key={i*10+j}/>
                                    else if (word.indexOf("&") != -1)
                                       return <Input checkbox defaultValue={worldObject.header[word.substring(word.indexOf("$") + 1)]} key={i*10+j}/>
                                    else
                                       return <span className="sidebar-input--readonly" key={i*10+j}>{worldObject.header[word.substring(word.indexOf("$") + 1)]}</span>
                                 })
                              }
                              </div>
                           </div>
                        )
                     }

                     if (typeof value == "object") {

                     }
                  })
               }
               </div>
            }
         </div>
      )
   else
      return "";
}

function GeneralTab() {
   return {

   }
}

export default connect(state => {
   return {
      show: state.menu.view.sidebar,
      worldObject: state.app.worldObject
   }
})(Sidebar);
