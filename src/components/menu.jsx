import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import menu from "/app/menu.js";
import { stateChange, stateToggle } from "/state/state.js";

import MenuFolder from "/components/menu/folder.jsx";
import MenuFolderButton from "/components/menu/folder-button.jsx";
import { AccountBoxIcon, GithubIcon } from "/components/icon.jsx";
import "/components/styles/menu.css";

import { appVersion, ingameSupportedVersion } from "/version.json";

function Menu({ stateChange, stateToggle, view, running, user, unsafe, unsafeOnlyTiles, ignoreBounds}) {
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
      Plugins: {
         "Block randomizer": {
            type: "default",
            enabled: running,
            onClick: menu.onPluginBlockSwap
         }
      },
      "Map loading": {
         "Disable checking sections offsets (helps with corrupted files)": {
            type: "checkbox",
            checked: unsafe,
            onClick: () => {
               stateToggle(["canvas", "unsafe"]);
            }
         },
         "Enable ignoring buffer bounds (helps with missing data in files)": {
            type: "checkbox",
            checked: ignoreBounds,
            onClick: () => {
               stateToggle(["canvas", "ignoreBounds"]);
            }
         },
         "Enable loading only tiles (any valid >1.3.5.3 map viewing ONLY)": {
            type: "checkbox",
            checked: unsafeOnlyTiles,
            onClick: () => {
               stateToggle(["canvas", "unsafeOnlyTiles"]);
            }
         },
         DIVIDER,
         "NOTE: Resaving the map in the latest Terraria should fix any problems": {
            type: "default",
            enabled: false
         },
      },
      Report: {
         "Error": () => { stateChange("modal", "errorreport") },
         "Suggestions or feature requests": () => { stateChange("modal", "suggestionreport") }
      }
   };

   const onAccountClick = () => {
      if (user !== null)
         stateChange("modal", "account");
      else
         stateChange("modal", "signin");
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
            <MenuFolderButton label={"version: " + appVersion} onClick={() => {console.log("hey baby!")}}/>
            <MenuFolderButton label={"supported game version: " + ingameSupportedVersion} onClick={() => {console.log(";)")}}/>
            <MenuFolderButton label={user !== null ? user.username : "Account"} onClick={onAccountClick} Icon={AccountBoxIcon}/>
            <MenuFolderButton label="Github" onClick={onGithubClick} Icon={GithubIcon}/>
         </div>
      </div>
   )
}

export default connect(state => {
      return {
         view: state.view,
         user: state.user,
         running: state.canvas.running,
         unsafe: state.canvas.unsafe,
         unsafeOnlyTiles: state.canvas.unsafeOnlyTiles,
         ignoreBounds: state.canvas.ignoreBounds
      };
   },
   { stateChange, stateToggle }
)(Menu);
