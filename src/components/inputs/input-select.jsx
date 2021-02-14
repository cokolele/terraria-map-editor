import React from "react";

import { ArrowDownIcon } from "/components/icon.jsx";
import "/components/styles/input.css";

function InputSelect({
      label,
      options,
      value,
      onChange,
      className,
      width
   }) {

   let missingOption;
   if (value && value !== "null") {
      if (typeof options[0] == "object") {
         if (!options.some(([optionValue, optionId]) => optionId == value)) {
            missingOption = value;
         }
      } else if (!options.some(optionValue => optionValue == value)) {
         missingOption = value;
      }
   }

   return (
      <div className={`input-container ${className ?? ""}`}>
         {
            label &&
            <span className="input-label">{label + ":"}</span>
         }
         <div className="input-select-container">
            <select className="input-select" value={value ? value : (typeof options[0] == "object" ? options[0][1] : options[0])} onChange={(e) => {onChange(e.target.value)}} style={width && {width}}>
               {
                  options.map((option, i) => {
                     if (typeof option == "object")
                        return <option value={option[1]} key={i}>{option[0]}</option>
                     return <option value={option} key={i}>{option}</option>
                  })
               }
               {
                  missingOption &&
                  <option value={missingOption}>{missingOption}</option>
               }
            </select>
            <ArrowDownIcon className="input-select-arrow"/>
         </div>
      </div>
   );
}

export default InputSelect;
