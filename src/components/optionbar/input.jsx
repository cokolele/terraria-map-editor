import React, { useState } from "react";

import "/components/styles/optionbar/input.css";

function OptionbarInput({ value, onChange, width, int, float, min, max, roundTo = 2, className }) {
   const _onChange = (e) => {
      if (((float || int) && isNaN(e.target.value)) || (min !== undefined && e.target.value < min) || (max !== undefined && e.target.value > max))
         return;

      if (float)
         onChange(Math.round(e.target.value * (10 * roundTo)) / 100);
      else if (int)
         onChange(Math.round(e.target.value));
      else
         onChange(e.target.value);
   };

   return (
      <div className={"optionbar-input-container" + (className ? " " + className : "")}>
         <input className="optionbar-input" type="text" value={value} onChange={_onChange} style={width && { width }}/>
      </div>
   );
}

export default OptionbarInput;
