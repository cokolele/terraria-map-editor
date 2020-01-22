import React, { useState } from "react";

import { ErrorOutlineIcon } from "/components/icon.jsx";
import "/components/styles/modal/sign/input.css";

function ModalSignInput({ label, value, onChange, password, error, onBlur }) {
   const _onChange = e => {
      onChange(e.target.value);
   }

   return (
      <>
         <input className={"modal-sign-input" + (error ? " modal-sign-input--errored" : "")} type={password ? "password" : "text"} placeholder={label} value={value} onChange={_onChange} onBlur={onBlur}/>
         <span className="modal-sign-input-error">{error}</span>
      </>
   );
}

export default ModalSignInput;
