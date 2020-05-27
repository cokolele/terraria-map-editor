import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import menu from "/app/menu.js";
import { stateChangeModal, stateToggleUnsafe, stateToggleUnsafeOnlyTiles } from "/state/modules/app.js";

import MenuFolder from "/components/menu/folder.jsx";
import MenuFolderButton from "/components/menu/folder-button.jsx";
import { AccountBoxIcon, GithubIcon } from "/components/icon.jsx";
import "/components/styles/menu.css";

function Menu({ view, running, loggedIn, user, stateChangeModal, worldObject, unsafe, stateToggleUnsafe, unsafeOnlyTiles, stateToggleUnsafeOnlyTiles }) {
   useEffect(() => {
      menu.setWorldObject(worldObject);
   }, [worldObject]);

   const [currentTab, setCurrentTab] = useState(false);

   const DIVIDER = "__DIVIDER__";
   const config = {
      File: {
         "Open...": menu.onNewFile,
         "Open example map": {
            type: "menu",
            menu: {
               "Normal world": () => { menu.onExampleMap("normal") },
               "Drunk world (seed)": () => { menu.onExampleMap("drunk") },
               "Bees world (seed)": () => { menu.onExampleMap("bees") },
               "Good world (seed)": () => { menu.onExampleMap("good") }
            }
         },
         "Save map image": {
            type: "default",
            enabled: running,
            onClick: menu.onSaveImage
         },
         "Save": {
            type: "default",
            enabled: running,
            onClick: menu.onSaveFile
         },
         DIVIDER,
         Close: {
            type: "default",
            enabled: running,
            onClick: menu.onCloseFile
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
            onClick: menu.onToggleToolbar
         },
         Sidebar: {
            type: "checkbox",
            checked: view.sidebar,
            onClick: menu.onToggleSidebar
         }
      },
      "Map loading": {
         "Disable checking sections offsets (unsafe)": {
            type: "checkbox",
            checked: unsafe,
            onClick: stateToggleUnsafe
         },
         "Enable loading only tiles (any >1.3.5.3 map viewing ONLY)": {
            type: "checkbox",
            checked: unsafeOnlyTiles,
            onClick: stateToggleUnsafeOnlyTiles
         },
         DIVIDER,
         "NOTE: Resaving the map in the latest Terraria should fix any problems": {
            type: "default",
            enabled: false
         },
      },
      "Report": {
         "Error": () => { stateChangeModal("errorreport") },
         "Suggestions or feature requests": () => { stateChangeModal("suggestionreport") }
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
            Object.keys(config).map((label, i) => {
               if (typeof config[label] == "object" && config[label].type && config[label].type == "button")
                  return <MenuFolderButton label={label} onClick={config[label].onClick} index={i+1} key={i}/>
               else
                  return <MenuFolder label={label} options={config[label]} currentTab={currentTab} setCurrentTab={setCurrentTab} index={i+1} key={i}/>
            })
         }
         </div>
         <div className="menu">
            <MenuFolderButton label="version 2.2.4" onClick={() => {console.log("hey baby!")}}/>
            <MenuFolderButton label="supported game version: 1.4.0.4" onClick={() => {console.log(";)")}}/>
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
         worldObject: state.app.worldObject,
         unsafe: state.app.unsafe,
         unsafeOnlyTiles: state.app.unsafeOnlyTiles
      };
   },
   { stateChangeModal, stateToggleUnsafe, stateToggleUnsafeOnlyTiles }
)(Menu);
