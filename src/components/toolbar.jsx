import React, { useEffect } from "react";

import { connect } from "react-redux";

import "/components/styles/toolbar.css";

function Toolbar({ show }) {
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
