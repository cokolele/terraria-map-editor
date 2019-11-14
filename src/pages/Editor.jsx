import React, { useReducer } from "react";

import MapCanvas from "/components/map-canvas.jsx";
import Menu from "/components/menu.jsx";
import StatusBar from "/components/status-bar.jsx";

import "./editor.css";

function Editor() {
   return (
      <div className="editor">
         <Menu/>
         <MapCanvas/>
         <StatusBar/>
      </div>
   )
}

export default Editor;
