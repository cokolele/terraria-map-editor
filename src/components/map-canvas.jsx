import React, { useRef, useEffect } from "react";

import "./map-canvas.css";

function Canvas() {
   const canvasEl = useRef(null);

   useEffect(() => {
      const ctx = canvasEl.current.getContext("2d");
   }, []);

   return (
      <canvas ref={canvasEl} ></canvas>
   )
}

export default Canvas;