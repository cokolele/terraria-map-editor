import React from "react";

import "/components/styles/toolbar/tool.css";

function Tool({ title, Icon, onClick, selected, name, stroke }) {
   const _onClick = () => {
      onClick(name);
   }

   return (
      <div className={"toolbar-tool" + (selected ? " toolbar-tool--selected" : "") + (stroke ? " toolbar-tool--stroke" : "")} title={title} onClick={_onClick}>
         <Icon size="100%"/>
      </div>
   );
}

export default Tool;
