import React from "react";

import "/components/styles/toolbar/tool-button.css";

function Tool({ title, Icon, onClick, selected, name, stroke }) {
   const _onClick = () => {
      onClick(name);
   }

   return (
      <button type="button" className={"toolbar-tool-button" + (selected ? " toolbar-tool-button--selected" : "") + (stroke ? " toolbar-tool-button--stroke" : "")} title={title} onClick={_onClick}>
         <Icon size="20px"/>
      </button>
   );
}

export default Tool;
