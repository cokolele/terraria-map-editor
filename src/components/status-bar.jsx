import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { changePercentage } from "/state/modules/status.js";

import "./status-bar.css";

function StatusBar({ percentage, description, error, changePercentage }) {
   useEffect(() => {
      if (percentage == 100) {
         changePercentage(null);
      }
   }, [percentage]);

   return (
      <div className="status-bar-container">
         <div className="status-bar">
            <div className="status-zoom"></div>
            <div className="status-action">
               <span>{ description == null ? "-" : description }</span>
               <div className="status-action-percentage" style={{width: percentage == null ? 0 : percentage + "%"}}></div>
               <div className="status-action-percentage" style={{width: percentage == null ? 0 : percentage + "%"}}></div>
            </div>
            <div className="status-error">{error}</div>
         </div>
      </div>
   )
}

export default connect(
   state => {
      return {
         percentage: state.status.percentage,
         description: state.status.description,
         error: state.status.error
      };
   },
   { changePercentage }
)(StatusBar);
