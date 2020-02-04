import React, { useState } from "react";

import { ArrowDownIcon } from "/components/icon.jsx";
import "/components/styles/optionbar/input.css";

function OptionbarInputSelect({ label, options, value, onChange, className, width }) {
   const [_value, setValue] = useState(value ? value : (typeof options[0] == "object" ? options[0][1] : options[0]));
   const _onChange = (e) => {
      setValue(e.target.value);
      onChange(e.target.value);
   };

   return (
      <div className={"optionbar-input-container" + (className ? " " + className : "")}>
         {
            label &&
            <span className="optionbar-input-label">{label + ":"}</span>
         }
         <div className="optionbar-input-select-container">
            <select className="optionbar-input-select" value={_value} onChange={_onChange} style={width && {width}}>
               {
                  options.map((option, i) => {
                     if (typeof option == "object")
                        return <option value={option[1]} key={i}>{option[0]}</option>
                     return <option value={option} key={i}>{option}</option>
                  })
               }
            </select>
            <ArrowDownIcon className="optionbar-input-select-arrow"/>
         </div>
      </div>
   );
}

export default OptionbarInputSelect;
