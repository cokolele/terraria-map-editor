/*
   !
   needs rework
   is a mess
*/

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import menu from "/app/menu.js";
import { stateChange, stateToggle } from "/state/state.js";

import MenuFolder from "/components/menu/folder.jsx";
import MenuFolderButton from "/components/menu/folder-button.jsx";
import { LogoIcon, AccountBoxIcon, GithubIcon } from "/components/icon.jsx";
import "/components/styles/menu.css";

import { appVersion, ingameSupportedVersion } from "/version.json";

function Menu({ stateChange, stateToggle, view, running, user, unsafe, unsafeOnlyTiles, ignoreBounds, drawer, mobile}) {
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
         mobile: false,
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
         mobile: false,
         Toolbar: {
            type: "checkbox",
            checked: view.toolbar,
            onClick: menu.onToggleToolbar
         },
         Sidebar: {
            type: "checkbox",
            checked: view.sidebar,
            onClick: menu.onToggleSidebar
         },
         DIVIDER,
         "Zoom website in": () => { menu.onWebsiteZoom("in") },
         "Zoom website out": () => { menu.onWebsiteZoom("out") },
         "Reset website zoom": () => { menu.onWebsiteZoom("reset") }
      },
      Plugins: {
         "Block randomizer": {
            type: "default",
            enabled: running,
            onClick: menu.onPluginBlockSwap
         },
         "Replace block": {
            type: "default",
            enabled: running,
            onClick: () => { stateChange("modal", "replaceblock") }
         }
      },
      "Map loading": {
         "Ignore section offset check (corrupted data fix)": {
            type: "checkbox",
            checked: unsafe,
            onClick: () => { stateToggle(["canvas", "unsafe"]) }
         },
         "Ignore buffer bounds (missing data fix)": {
            type: "checkbox",
            checked: ignoreBounds,
            onClick: () => { stateToggle(["canvas", "ignoreBounds"]) }
         },
         "Load only tiles data": {
            type: "checkbox",
            checked: unsafeOnlyTiles,
            onClick: () => { stateToggle(["canvas", "unsafeOnlyTiles"]) }
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

   //for closing the drawer
   const onContainerClick = (e) => {
      if (e.clientX > e.currentTarget.getBoundingClientRect().width)
         stateChange(["appbar", "drawer"], null);
   }

   return (
      <div className={"menu-container" + (drawer == "menu" ? " drawer" : "")} onClick={onContainerClick}>
         <div className="menu">
            <div className="menu-logo">
            </div>
            {
               Object.keys(config).map((label, i) => {
                  if (typeof config[label] == "object" && config[label].mobile === false)
                     if (mobile)
                        return;
                     else
                        delete config[label].mobile;
                  if (typeof config[label] == "object" && config[label].type && config[label].type == "button")
                     return <MenuFolderButton label={label} onClick={config[label].onClick} index={i+1} key={i}/>
                  else
                     return <MenuFolder label={label} options={config[label]} currentTab={currentTab} setCurrentTab={setCurrentTab} index={i+1} key={i}/>
               })
            }
            <div className="flex-filler"></div>
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
         ignoreBounds: state.canvas.ignoreBounds,
         drawer: state.appbar.drawer,
         mobile: state.mobile
      };
   },
   { stateChange, stateToggle }
)(Menu);
