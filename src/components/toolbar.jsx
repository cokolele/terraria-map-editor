import React, { useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import Tool from "/components/toolbar/tool.jsx";
import "/components/styles/toolbar.css";

import toolsConfig from "/app/tools.js";

function Toolbar({ show, selectedTool, stateChange }) {
   const onToolClick = (toolName) => {
      stateChange(["toolbar", "tool"], toolName);
   };

   return (
      show &&
      <div className="toolbar-container">
         <div className="toolbar">
            {
               Object.entries(toolsConfig).map(([name, tool], i) =>
                  <Tool title={tool.title} Icon={tool.icon} key={i} onClick={onToolClick} selected={name == selectedTool ? true : false} name={name} stroke={tool.stroke}/>
               )
            }
         </div>
      </div>
   )
}

export default connect(state => {
      return {
         show: state.view.toolbar,
         selectedTool: state.toolbar.tool
      }
   }, { stateChange }
)(Toolbar);
