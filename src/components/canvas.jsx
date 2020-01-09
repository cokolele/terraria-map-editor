import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import "/components/styles/canvas.css";

import init, { changeCanvasWorldFile, changeCanvasTool, changeCanvasLayersVisibility } from "/app/canvas/main.js";

function Canvas({ worldFile, statusDescription, tool, changeRunning, layersVisibility }) {
   const canvasEl = useRef(null);

   useEffect(() => {
      init(canvasEl.current);
   }, []);

   useEffect(() => {
      changeCanvasWorldFile(worldFile);
   }, [worldFile]);

   useEffect(() => {
      changeCanvasTool(tool);
   }, [tool]);

   useEffect(() => {
      changeCanvasLayersVisibility(layersVisibility);
   }, [layersVisibility]);

   return (
      <div className="canvas-container">
         <div className={"canvas-container-inner" + (statusDescription == "Finished" ? "" : " hidden")}>
            <div className="canvas-container-label">{worldFile && worldFile.name}</div>
            <canvas ref={canvasEl}></canvas>
         </div>
         {
            statusDescription !== "Finished" &&
            <div className="canvas-placeholder">
            TERRARIA MAP EDITOR
            </div>
         }
      </div>
   )
}

export default connect(state => {
   return {
      worldFile: state.app.worldFile,
      statusDescription: state.status.description,
      tool: state.app.toolbar.tool,
      layersVisibility: state.app.layersVisibility
   }
})(Canvas);
