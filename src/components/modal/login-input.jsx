import React, { useState } from "react";

import { ErrorOutlineIcon } from "/components/icon.jsx";
import "/components/styles/modal/login-input.css";

function ModalLoginInput({ value, setValue, text, password, submit, placeholder, errorMessage, onBlur, onClick }) {
   const onChange = e => {
      setValue(e.target.value);
   }

   const _onClick = e => {
      e.target.blur();
      onClick();
   }

   if (text || password)
      return (
         <>
            <input className={"modal-login-input" + (errorMessage ? " modal-login-input--errored" : "")} type={text ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur}/>
            <span className="modal-login-input-error">{errorMessage}</span>
         </>
      );

   if (submit)
      return (
         <>
            <button className="modal-login-submit" type="button" onClick={_onClick}>{value}</button>
            {
               errorMessage &&
               <div className="modal-login-submit-error">
                  <ErrorOutlineIcon/>
                  <span className="modal-login-submit-error">{errorMessage}</span>
               </div>
            }
         </>
      );

   return "";
}

export default ModalLoginInput;
