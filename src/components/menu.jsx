import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import menu from "/app/menu.js";
import { stateChange, stateToggle } from "/state/state.js";

import { CSSTransition } from "react-transition-group";
import InputLink from "/components/inputs/input-link.jsx";
import { LogoIcon, AccountBoxIcon, GithubIcon, DiscordIcon } from "/components/icon.jsx";
import "/components/styles/menu.css";

/*
 * TODO: shortcuts
 */

function Menu({ stateChange, stateToggle, view, running, user, unsafe, unsafeOnlyTiles, ignoreBounds, drawer, mobile}) {
   const DIVIDER = { type: "divider" };
   const config = {
      File: {
         "Open...": {
            type: "link",
            onClick: menu.onNewFile,
         },
         "Open example map": {
            type: "menu",
            items: {
               "Normal world": () => { menu.onExampleMap("normal") },
               "Drunk world (seed)": () => { menu.onExampleMap("drunk") },
               "Bees world (seed)": () => { menu.onExampleMap("bees") },
               "For the worthy world (seed)": () => { menu.onExampleMap("good") }
            }
         },
         "Save map image": {
            type: "button",
            enabled: running,
            onClick: menu.onSaveImage
         },
         "Save": {
            type: "button",
            enabled: running,
            onClick: menu.onSaveFile
         },
         DIVIDER,
         Close: {
            type: "button",
            enabled: running,
            onClick: menu.onCloseFile
         },
      },
      Edit: {
         mobile: false,
         "Undo": {
            type: "button",
            enabled: false,
            onClick: () => { console.log("undo") }
         },
         "Redo": {
            type: "button",
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
         "Replace block": {
            type: "link",
            enabled: running,
            onClick: () => { stateChange("modal", "replaceblock") }
         },
         "Block randomizer": {
            type: "button",
            enabled: running,
            onClick: menu.onPluginBlockSwap
         },
         DIVIDER,
         "Export bestiary": {
            type: "button",
            enabled: running,
            onClick: menu.onBestiaryExport
         },
         "Import bestiary": {
            type: "button",
            enabled: running,
            onClick: menu.onBestiaryImport
         },
         "Complete the bestiary": {
            type: "button",
            enabled: running,
            onClick: menu.onBestiaryFill
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
            type: "button",
            enabled: false
         },
      },
      Report: {
         "Error": {
            type: "link",
            onClick: () => { stateChange("modal", "errorreport") }
         },
         "Suggestions or feature requests": {
            type: "link",
            onClick: () => { stateChange("modal", "suggestionreport") }
         }
      }
   };

   const [currentTab, setCurrentTab] = useState(null);
   const [dropdownOffset, setDropdownOffset] = useState(null);

   //top link click
   const onDropdownOpen = (e, i) => {
      setDropdownOffset(e.currentTarget.getBoundingClientRect());
      setCurrentTab(currentTab === i ? null : i);
   }

   //enabled menu option click
   const onDropdownClose = () => {
      stateChange(["appbar", "drawer"], null);
      setCurrentTab(null);
   }

   //on click somewhere else after showing menu
   const onDropdownBlur = (e) => {
      if (!mobile)
         if (e.relatedTarget === null || (!e.relatedTarget.classList.contains("menu-dropdown-item") && !e.relatedTarget.classList.contains("menu-dropdown")))
            onDropdownClose();
   }

   //on out of mobile menu click
   const onContainerClick = (e) => {
      if (mobile && e.clientX > e.currentTarget.getBoundingClientRect().width)
         stateChange(["appbar", "drawer"], null);
   }

   return (
      <div className={"menu-container" + (drawer == "menu" ? " drawer" : "")} onClick={onContainerClick}>
         <div className="menu">
            <div className="menu-logo"></div>
            {
               Object.entries(config).map(([label, items], i) =>
                  (mobile && items.mobile === false) ? null :
                  <React.Fragment key={i}>
                     <InputLink
                        className={`menu-link ${currentTab === i ? "--active" : ""}`}
                        label={label}
                        onClick={(e) => onDropdownOpen(e, i)}
                        onMouseEnter={(e) => !mobile && currentTab !== null && currentTab !== i && onDropdownOpen(e, i)}
                        onBlur={onDropdownBlur}
                     />

                     <Dropdown
                        show={currentTab === i}
                        items={items}
                        offset={dropdownOffset}
                        onClose={onDropdownClose}
                        onBlur={onDropdownBlur}
                        mobile={mobile}
                     />
                  </React.Fragment>
               )
            }

            <div className="flex-filler"></div>

            <InputLink
               className="menu-link"
               label="Changelog"
               onClick={() => stateChange("modal", "changelog")}
            />
            <InputLink
               className="menu-link"
               label={user !== null ? user.username : "Account"}
               Icon={<AccountBoxIcon size={15}/>}
               onClick={() => stateChange("modal", user ? "account" : "signin")}
            />
            <InputLink
               className="menu-link"
               label="Discord"
               Icon={<DiscordIcon size={15}/>}
               href="https://discord.gg/xHcHd7mfpn"
            />
            <InputLink
               className="menu-link"
               label="Github"
               Icon={<GithubIcon size={15}/>}
               href="https://github.com/cokolele/terraria-map-editor"
            />
         </div>
      </div>
   )
}

function Dropdown({ show, items, offset, onClose, onBlur, nested, mobile }) {
   if (mobile)
      return (
         <CSSTransition
            in={show}
            appear={true}
            timeout={300}
            onEnter={el => el.style.maxHeight = "0px"}
            onEntering={el => el.style.maxHeight = el.scrollHeight + "px"}
            onEntered={el => el.style.maxHeight = ""}
            onExit={el => el.style.maxHeight = el.scrollHeight + "px"}
            onExiting={el => el.style.maxHeight = "0px"}
            unmountOnExit
         >
            <div
               className={`menu-dropdown ${nested ? "--nested" : ""}`}
               tabIndex="-1"
            >
            {
               Object.entries(items).map(([label, options], i) =>
                  <DropdownItem label={label} options={options} onClose={onClose} onBlur={onBlur} mobile={mobile} key={i}/>
               )
            }
            </div>
         </CSSTransition>
      )

   if (show)
      return (
         <div
            className={`menu-dropdown ${nested ? "--nested" : ""}`}
            style={nested ? {} : {top: offset.bottom - 1 + "px", left: offset.left + "px"}}
            tabIndex="-1"
            onBlur={onBlur}
         >
         {
            Object.entries(items).map(([label, options], i) =>
               <DropdownItem label={label} options={options} onClose={onClose} onBlur={onBlur} mobile={mobile} key={i}/>
            )
         }
         </div>
      )

   return null;
}

function DropdownItem({ label, options, onClose, onBlur, mobile }) {
   if (typeof options == "function")
      options = { type: "button", onClick: options};

   const _onClick = () => {
      if (options.enabled !== false) {
         options.onClick();

         if (mobile && options.type == "checkbox")
            return;

         onClose();
      }
   }

   if (options.type == "divider")
      return <div className="menu-dropdown-item --divider" tabIndex="-1" onBlur={onBlur}/>;

   if (options.type == "button" || options.type == "checkbox")
      return (
         <button
            type="button"
            className={`menu-dropdown-item ${options.type == "checkbox" ? "--checkbox" : ""} ${options.checked ? "--checked" : ""} ${options.enabled === false ? "--disabled" : ""}`}
            onMouseDown={_onClick}
            onKeyPress={e => (e.key == "Enter" || e.key == " ") && _onClick()}
            onBlur={onBlur}
         >
         {label}
         </button>
      );

   if (options.type == "link")
      return (
         <a
            className={`menu-dropdown-item ${options.enabled === false ? "--disabled" : ""}`}
            onMouseDown={_onClick}
            tabIndex="0"
            onKeyPress={e => (e.key == "Enter" || e.key == " ") && _onClick()}
            onBlur={onBlur}
         >
         {label}
         </a>
      );

   if (options.type == "menu") {
      const [open, setOpen] = useState(false);

      return (
         <>
            <div
               className={`menu-dropdown-item --menu ${open ? "--active" : ""} ${options.enabled === false ? "--disabled" : ""}`}
               onMouseOver={() => options.enabled !== false && !mobile && setOpen(true)}
               onMouseDown={() => options.enabled !== false && setOpen(!open)}
               onMouseLeave={() => !mobile && setOpen(false)}
               tabIndex="0"
               onKeyPress={e => (e.key == "Enter" || e.key == " ") && options.enabled !== false && setOpen(!open)}
               onBlur={onBlur}
            >
               {label}
               {
                  open && !mobile &&
                  <Dropdown items={options.items} onClose={onClose} nested show={open}/>
               }
            </div>
            {
               mobile &&
               <Dropdown items={options.items} onClose={onClose} nested mobile={mobile} show={open}/>
            }
         </>
      )
   }

   return null;
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
