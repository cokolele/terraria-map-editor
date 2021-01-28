import React from "react";

import "/components/styles/input.css";

function InputButton({ label, onClick, IconLeft, IconRight, Icon, className }) {
   return (
      <div className={"input-container input-container--no-grow" + (className ? " " + className : "")}>
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
            {
               Icon &&
               <Icon size={12}/>
            }
         </button>
      </div>
   );
}

export default InputButton;
