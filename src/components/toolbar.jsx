import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeToolbarTool } from "/state/modules/app.js";

import { ToolMove } from "/components/icon.jsx";
import Tool from "/components/toolbar/tool.jsx";
import "/components/styles/toolbar.css";

const toolsConfig = [
   {
      name: "move",
      title: "Move tool (hand)",
      icon: ToolMove
   }
];

function Toolbar({ show, selectedTool, changeToolbarTool }) {
   const onToolClick = (toolName) => {
      changeToolbarTool(toolName);
   };

   if (show)
      return (
         <div className="toolbar-container">
            <div className="toolbar">
               {
                  toolsConfig.map((tool, i) =>
                     <Tool title={tool.title} Icon={tool.icon} key={i} onClick={onToolClick} selected={tool.name == selectedTool ? true : false} name={tool.name}/>
                  )
               }
            </div>
         </div>
      )
   else
      return "";
}

export default connect(state => {
      return {
         show: state.app.view.toolbar,
         selectedTool: state.app.toolbar.tool
      }
   }, { changeToolbarTool }
)(Toolbar);
