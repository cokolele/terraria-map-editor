import React from "react";

import "/components/styles/toolbar/tool.css";

function Tool({ title, Icon, onClick, selected, name }) {
   const _onClick = () => {
      onClick(name);
   }

   return (
      <button type="button" className={"toolbar-tool" + (selected ? " toolbar-tool--selected" : "")} title={title} onClick={_onClick}>
         <Icon size={20}/>
      </button>
   );
}

export default Tool;
