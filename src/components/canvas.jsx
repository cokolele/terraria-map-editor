import React, { useRef, useEffect } from "react";

import init from "/app/canvas/main.js";

import "./canvas.css";

function Canvas() {
   const canvasEl = useRef(null);

   useEffect(() => {
      init(canvasEl.current);
   }, []);

   return (
      <div className="canvas-container">
         <div className="canvas-container-inner">
            <div className="canvas-container-label">Canvas</div>
            <canvas ref={canvasEl}></canvas>
         </div>
      </div>
   )
}

export default Canvas;
