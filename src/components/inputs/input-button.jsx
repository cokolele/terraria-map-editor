import React, { useState } from "react";

import "/components/styles/input.css";

function InputButton({ label, onClick, IconLeft, IconRight, className }) {
   return (
      <div className={"input-container" + (className ? " " + className : "")}>
         <button type="button" className={"input-button"} onClick={onClick}>
            {
               IconLeft &&
               <IconLeft size={12} style={{marginRight: "0.15rem"}}/>
            }
            {
               label &&
               <span className="input-label input-label--button">{label}</span>
            }
            {
               IconRight &&
               <IconRight size={12} style={{marginLeft: "0.15rem"}}/>
            }
         </button>
      </div>
   );
}

export default InputButton;
