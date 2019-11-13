import React, { useReducer } from "react";

import MapCanvas from "/components/map-canvas.jsx";
import Menu from "/components/menu.jsx";
import StatusBar from "/components/status-bar.jsx";

import "./editor.css";
import "./layout.css";

function Editor() {
   return (
      <div className="editor flex-column">
         <Menu/>
         <MapCanvas/>
         <StatusBar/>
      </div>
   )
}

export default Editor;
