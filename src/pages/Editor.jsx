import React, { useReducer } from "react";

import Menu from "/components/menu.jsx";
import Optionbar from "/components/optionbar.jsx";
import Toolbar from "/components/toolbar.jsx";
import Canvas from "/components/canvas.jsx";
import Sidebar from "/components/sidebar.jsx";
import Statusbar from "/components/statusbar.jsx";
import Modal from "/components/modal.jsx";
import "./editor.css";

function Editor() {
   return (
      <div className="editor">
         <Canvas/>
         <Menu/>
         <Optionbar/>
         <Toolbar/>
         <Sidebar/>
         <Statusbar/>
         <Modal/>
      </div>
   )
}

export default Editor;
