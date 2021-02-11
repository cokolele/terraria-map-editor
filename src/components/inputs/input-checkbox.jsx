import React from "react";

import "/components/styles/input.css";

function InputCheckbox({
      label,
      value,
      onChange,
      className
   }) {

   return (
      <div className={`input-container ${className ? className : ""}`}>
         <div
            tabIndex="0"
            className={`input-checkbox ${value ? "--checked" : ""}`}
            onClick={() => {onChange(!value)}}
            onKeyPress={e => e.key == "Enter" && onChange(!value)}
         ></div>
         {
            label &&
            <span
               className="input-label --rightside"
               onClick={() => {onChange(!value)}}
            >{label}</span>
         }
      </div>
   );
}

export default InputCheckbox;
