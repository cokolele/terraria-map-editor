import React, { useRef, useEffect } from "react";

import { connect } from "react-redux";

import init from "/app/canvas/main.js";

import "./canvas.css";

function Canvas({ file }) {
   const canvasEl = useRef(null);

   useEffect(() => {
      if (canvasEl.current !== null)
         init(canvasEl.current);
   });

   return (
      <div className="canvas-container">
      {
         file &&
         <div className="canvas-container-inner">
            <div className="canvas-container-label">{file.name}</div>
            <canvas ref={canvasEl}></canvas>
         </div>
      }
      </div>
   )
}

export default connect(state => {
   return {
      file: state.menu.file
   }
})(Canvas);
