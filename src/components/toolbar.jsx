import React, { useEffect } from "react";

import { connect } from "react-redux";

import { refreshCanvasSize } from "/app/canvas/main.js";

import "./toolbar.css";

function Toolbar({ show }) {
   useEffect(() => {
      refreshCanvasSize()
   }, [show]);

   if (show)
      return (
         <div className="toolbar-container">
            <div className="toolbar debug_rotated_text">
            _toolbar
            </div>
         </div>
      )
   else
      return "";
}

export default connect(state => {
   return {
      show: state.menu.view.toolbar
   }
})(Toolbar);
