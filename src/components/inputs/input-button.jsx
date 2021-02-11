import React from "react";

import "/components/styles/input.css";

function InputButton({
      label,
      onClick,
      className,
      Icon,
      IconLeft,
      IconRight
   }) {

   return (
      <div className={`input-container --no-grow ${className ? className : ""}`}>
         <button
            type="button"
            className="input-button"
            onClick={onClick}
         >
            {
               IconLeft &&
               <div className="input-icon">
                  <IconLeft size={12}/>
               </div>
            }
            {
               label &&
               <span className="input-label --emphasis">{label}</span>
            }
            {
               IconRight &&
               <div className="input-icon">
                  <IconRight size={12}/>
               </div>
            }
            {
               Icon &&
               <div className="input-icon">
                  <Icon size={12}/>
               </div>
            }
         </button>
      </div>
   );
}

export default InputButton;
