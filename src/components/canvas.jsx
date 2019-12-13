import React, { useRef, useEffect } from "react";

import { connect } from "react-redux";

import init from "/app/canvas/main.js";

import "./canvas.css";

function Canvas({ file, statusDescription }) {
   const canvasEl = useRef(null);

   useEffect(() => {
      if (canvasEl.current !== null)
         init(canvasEl.current);
   });

   return (
      <div className={"canvas-container" + (statusDescription == "Finished" ? "" : " hidden")}>
         <div className="canvas-container-inner">
            <div className="canvas-container-label">{file && file.name}</div>
            <canvas ref={canvasEl}></canvas>
         </div>
      </div>
   )
}

export default connect(state => {
   return {
      file: state.menu.file,
      statusDescription: state.status.description
   }
})(Canvas);
