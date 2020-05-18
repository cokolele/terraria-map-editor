import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { onNewFile, onExampleMap, onCloseFile, onSaveImage, onSaveFile, onToggleSidebar, onToggleToolbar, setWorldObject } from "/app/menu.js";
import { stateChangeModal } from "/state/modules/app.js";
import { localSettings } from "/utils/localStorage.js";

import MenuFolder from "/components/menu/folder.jsx";
import MenuFolderButton from "/components/menu/folder-button.jsx";
import { AccountBoxIcon, GithubIcon } from "/components/icon.jsx";
import "/components/styles/menu.css";

function Menu({ view, running, loggedIn, user, stateChangeModal, worldObject }) {
   useEffect(() => {
      setWorldObject(worldObject);
   }, [worldObject]);

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
         Save: {
            type: "default",
            enabled: running,
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
      },
      "1.4 maps saving does not work yet": {},
      "if you encounter any problems, click here": {
         "i mean here": () => {
            stateChangeModal("errorreport");
         },
      }
   };

   const onAccountClick = () => {
      if (!loggedIn)
         stateChangeModal("signin");
      else
         stateChangeModal("account");
   }

   const onGithubClick = () => {
      const win = window.open("https://github.com/cokolele/terraria-web-editor", '_blank');
      win.focus();
   }

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
            <MenuFolderButton label={loggedIn ? user.username : "Account"} onClick={onAccountClick} Icon={AccountBoxIcon}/>
            <MenuFolderButton label="Github" onClick={onGithubClick} Icon={GithubIcon}/>
         </div>
      </div>
   )
}

export default connect(state => {
      return {
         view: state.app.view,
         running: state.app.running,
         loggedIn: state.app.loggedIn,
         user: state.app.user,
         worldObject: state.app.worldObject
      };
   },
   { stateChangeModal }
)(Menu);
