import React from "react";

import { ErrorOutlineIcon } from "/components/icon.jsx";
import "/components/styles/modal/account/button.css";

function ModalAccountButton({ label, onClick, error, text, disabled, primary }) {
   return (
      <div>
         <button type="button" className={"modal-account-button" + (disabled ? " modal-account-button--disabled" : "") + (primary ? " modal-account-button--primary" : "")} onClick={disabled ? undefined : onClick}>{label}</button>
         {
            text &&
            <div className="modal-account-button-text">{text}</div>
         }
         {
            error &&
            <div className="modal-account-button-error">
               <ErrorOutlineIcon size={"auto"}/>
               {error}
            </div>
         }
      </div>
   );
}

export default ModalAccountButton;
