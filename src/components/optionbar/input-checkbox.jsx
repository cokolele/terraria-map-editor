import React, { useState } from "react";

import "/components/styles/optionbar/input.css";

function OptionbarInputCheckbox({ label, value, onChange, className }) {
   const _onChange = () => {
      onChange(!value);
   };

   return (
      <div className={"optionbar-input-container" + (className ? " " + className : "")}>
         <div className={"optionbar-input-checkbox" + (value ? " optionbar-input-checkbox--checked" : "")} onClick={_onChange}></div>
         {
            label &&
            <span className="optionbar-input-label optionbar-input-label--rightside" onClick={_onChange} >{label + ":"}</span>
         }
      </div>
   );
}

export default OptionbarInputCheckbox;
