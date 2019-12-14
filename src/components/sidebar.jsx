import React, { useEffect } from "react";

import { connect } from "react-redux";

import { refreshCanvasSize } from "/app/canvas/main.js";

import "./sidebar.css";

function Sidebar({ show }) {
   useEffect(() => {
      refreshCanvasSize()
   }, [show]);

   if (show)
      return (
         <div className="sidebar-container">
            <div className="sidebar debug_rotated_text">
            _sidebar
            </div>
         </div>
      )
   else
      return "";
}

export default connect(state => {
   return {
      show: state.menu.view.sidebar
   }
})(Sidebar);
