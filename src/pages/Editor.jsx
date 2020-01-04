import React, { useReducer } from "react";

import Menu from "/components/menu.jsx";
import Toolbar from "/components/toolbar.jsx";
import Canvas from "/components/canvas.jsx";
import Sidebar from "/components/sidebar.jsx";
import StatusBar from "/components/status-bar.jsx";
import Modal from "/components/modal.jsx";
import "./editor.css";

function Editor() {
   return (
      <div className="editor">
         <Canvas/>
         <Menu/>
         <Toolbar/>
         <Sidebar/>
         <StatusBar/>
         <Modal/>
      </div>
   )
}

export default Editor;
