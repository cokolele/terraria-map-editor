import React, { useEffect } from "react";
import { connect } from "react-redux";
import { stateChangeToolbarTool } from "/state/modules/app.js";

import ToolButton from "/components/toolbar/tool-button.jsx";
import "/components/styles/toolbar.css";

import toolsConfig from "/app/tools.js";

function Toolbar({ show, selectedTool, stateChangeToolbarTool }) {
   const onToolClick = (toolName) => {
      stateChangeToolbarTool(toolName);
   };

   return (
      show &&
      <div className="toolbar-container">
         <div className="toolbar">
            {
               Object.entries(toolsConfig).map(([name, tool], i) =>
                  <ToolButton title={tool.title} Icon={tool.icon} key={i} onClick={onToolClick} selected={name == selectedTool ? true : false} name={name} stroke={tool.stroke}/>
               )
            }
         </div>
      </div>
   )
}

export default connect(state => {
      return {
         show: state.app.view.toolbar,
         selectedTool: state.app.toolbar.tool
      }
   }, { stateChangeToolbarTool }
)(Toolbar);
