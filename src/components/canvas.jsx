import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import "/components/styles/canvas.css";

import init from "/app/canvas/main.js";

function Canvas({ worldFile, running, stateForCanvas }) {
   const canvasEl = useRef(null);

   useEffect(() => {
      init(canvasEl.current);
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
