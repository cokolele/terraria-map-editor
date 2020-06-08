import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import "/components/styles/canvas.css";

import Main from "/canvas/main.js";

function Canvas({ worldFile, running }) {
   const canvasEl = useRef(null);

   useEffect(() => {
      Main.init(canvasEl.current);
   }, []);

   return (
      <div className="canvas-container">
         <div className={"canvas-container-inner" + (running ? "" : " hidden")}>
            <div className="canvas-container-label">{worldFile && worldFile.name.replace(".wld", "")}</div>
            <canvas ref={canvasEl}></canvas>
         </div>
         {
            !running &&
            <div className="canvas-placeholder">
            TERRARIA MAP EDITOR
            </div>
         }
      </div>
   )
}

export default connect(state => {
   return {
      worldFile: state.canvas.worldFile,
      running: state.canvas.running,
   }
})(Canvas);
