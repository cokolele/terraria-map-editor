import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import "/components/styles/canvas.css";

import init, { changeCanvasWorldFile, changeCanvasTool, changeCanvasLayersVisibility, changeCanvasActiveLayer, changeCanvasActiveSize, changeCanvasActiveColor, changeUnsafe } from "/app/canvas/main.js";

function Canvas({ worldFile, running, tool, changeRunning, layersVisibility, activeLayer, activeSize, activeColor, unsafe }) {
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

   useEffect(() => {
      changeCanvasActiveLayer(activeLayer);
   }, [activeLayer]);

   useEffect(() => {
      changeCanvasActiveSize(activeSize);
   }, [activeSize]);

   useEffect(() => {
      changeCanvasActiveColor(activeColor);
   }, [activeColor]);

   useEffect(() => {
      changeUnsafe(unsafe);
   }, [unsafe]);

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
      worldFile: state.app.worldFile,
      running: state.app.running,
      tool: state.app.toolbar.tool,
      layersVisibility: state.app.layersVisibility,
      activeLayer: state.app.optionbar.layer,
      activeSize: state.app.optionbar.size,
      activeColor: state.app.optionbar.color,
      unsafe: state.app.unsafe
   }
})(Canvas);
