import React, { useState } from "react";
import { connect } from "react-redux";

import MenuFolder from "/components/menu/folder.jsx";
import MenuFolderAccount from "/components/menu/folder-account.jsx";
import "/components/styles/menu.css";

import { localSettings } from "/utils/localStorage.js";
import { onNewFile, onExampleMap, onCloseFile, onSaveImage, onSaveFile, onToggleSidebar, onToggleToolbar } from "/app/menu.js";

function Menu({ view, running }) {
   const [currentTab, setCurrentTab] = useState(false);

   const DIVIDER = "__DIVIDER__";
   const config = {
      File: {
         "Open...": onNewFile,
         "Open example map": onExampleMap,
         "Save map image": {
            type: "default",
            enabled: running,
            onClick: onSaveImage
         },
         _Save: {
            type: "default",
            enabled: false,
            onClick: onSaveFile
         },
         DIVIDER,
         Close: {
            type: "default",
            enabled: running,
            onClick: onCloseFile
         },
      },
      Edit: {
         "Undo": {
            type: "default",
            enabled: false,
            onClick: () => { console.log("undo") }
         },
         "Redo": {
            type: "default",
            enabled: false,
            onClick: () => { console.log("redo") }
         }
      },
      View: {
         Toolbar: {
            type: "checkbox",
            checked: view.toolbar,
            onClick: onToggleToolbar
         },
         Sidebar: {
            type: "checkbox",
            checked: view.sidebar,
            onClick: onToggleSidebar
         }
      }
   };

   return (
      <div className="menu-container">
         <div className="menu">
         {
            Object.keys(config).map((label, i) =>
               <MenuFolder label={label} options={config[label]} currentTab={currentTab} setCurrentTab={setCurrentTab} index={i+1} key={i}/>
            )
         }
         </div>
         <div className="menu">
            <MenuFolderAccount/>
            <MenuFolderAccount __templink/>
         </div>
      </div>
   )
}

export default connect(state => {
   return {
      view: state.app.view,
      running: state.app.running
   };
})(Menu);
