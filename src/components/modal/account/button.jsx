import React from "react";

import { ErrorOutlineIcon } from "/components/icon.jsx";
import "/components/styles/modal/account/button.css";

function ModalAccountButton({ label, onClick, error, disabled }) {
   return (
      <div>
         <button type="button" className={"modal-account-button" + (disabled ? " modal-account-button--disabled" : "")} onClick={disabled ? undefined : onClick}>{label}</button>
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
