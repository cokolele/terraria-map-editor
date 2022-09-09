import React from "react";

import Menu from "/components/menu.jsx";
import Optionbar from "/components/optionbar.jsx";
import Toolbar from "/components/toolbar.jsx";
import Canvas from "/components/canvas.jsx";
import Sidebar from "/components/sidebar.jsx";
import Statusbar from "/components/statusbar.jsx";
import Modal from "/components/modal.jsx";
import Appbar from "/components/appbar.jsx";
import "./Editor.css";

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
         <Appbar/>
      </div>
   )
}

export default Editor;
