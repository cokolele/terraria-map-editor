import React, { useState } from "react";

import { ErrorOutlineIcon } from "/components/icon.jsx";
import "/components/styles/modal/sign/input.css";

function ModalSignInput({ value, setValue, text, password, submit, placeholder, errorMessage, onBlur, onClick }) {
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
            <input className={"modal-sign-input" + (errorMessage ? " modal-sign-input--errored" : "")} type={text ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur}/>
            <span className="modal-sign-input-error">{errorMessage}</span>
         </>
      );

   if (submit)
      return (
         <>
            <button className="modal-sign-submit" type="button" onClick={_onClick}>{value}</button>
            {
               errorMessage &&
               <div className="modal-sign-submit-error">
                  <ErrorOutlineIcon/>
                  <span className="modal-sign-submit-error">{errorMessage}</span>
               </div>
            }
         </>
      );

   return "";
}

export default ModalSignInput;
