import React, { useRef, useEffect } from "react";

import init from "/app/canvas/main.js";

import "./map-canvas.css";

function Canvas() {
   const canvasEl = useRef(null);

   useEffect(() => {
      init(canvasEl.current);
   }, []);

   return (
      <div className="canvas-container">
         <canvas ref={canvasEl}></canvas>
      </div>
   )
}

export default Canvas;
