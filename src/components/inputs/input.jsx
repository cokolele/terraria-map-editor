import React from "react";

import "/components/styles/input.css";

function Input({
      label,
      value,
      onChange,
      width,
      int,
      float,
      min,
      max,
      roundTo = 2,
      className,
      canBeNull = false,
      placeholder
   }) {

   const _onChange = (e) => {
      if (((float || int) && isNaN(e.target.value)) || (min !== undefined && e.target.value < min) || (max !== undefined && e.target.value > max))
         return;

      if (float)
         if (canBeNull && e.target.value === "")
            onChange("");
         else
            onChange(Math.round(e.target.value * (10 * roundTo)) / 100);
      else if (int)
         if (canBeNull && e.target.value === "")
            onChange("");
         else
            onChange(Math.round(e.target.value));
      else
         onChange(e.target.value);
   };

   return (
      <div className={"input-container" + (className ? " " + className : "")}>
         {
            label &&
            <span className="input-label">{label + ":"}</span>
         }
         <input className="input" type="text" value={value} onChange={_onChange} style={width && { width }} placeholder={placeholder}/>
      </div>
   );
}

export default Input;
