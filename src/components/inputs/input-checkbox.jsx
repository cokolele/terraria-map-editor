import React, { useState } from "react";

import "/components/styles/input.css";

function InputCheckbox({ label, value, onChange, className }) {
   const _onChange = () => {
      onChange(!value);
   };

   return (
      <div className={"input-container" + (className ? " " + className : "")}>
         <div className={"input-checkbox" + (value ? " input-checkbox--checked" : "")} onClick={_onChange}></div>
         {
            label &&
            <span className="input-label input-label--rightside" onClick={_onChange}>{label}</span>
         }
      </div>
   );
}

export default InputCheckbox;
