import React from "react";

import "/components/styles/input.css";

function InputCheckbox({ label, value, onChange, className }) {
   return (
      <div className={"input-container" + (className ? " " + className : "")}>
         <div tabIndex="0" className={"input-checkbox" + (value ? " input-checkbox--checked" : "")} onClick={() => {onChange(!value)}} onKeyPress={(e) => e.key == "Enter" && onChange(!value)}/>
         {
            label &&
            <span className="input-label input-label--rightside" onClick={() => {onChange(!value)}}>{label}</span>
         }
      </div>
   );
}

export default InputCheckbox;
