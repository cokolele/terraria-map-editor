import React from "react";

import "/components/styles/modal/login-input-inline.css";

function ModalLoginInput({ link, placeholder, onClick }) {
   const _onClick = e => {
      e.target.blur();
      onClick();
   }

   if (link)
      return (
         <a onClick={_onClick} className="modal-login-input-inline">{placeholder}</a>
      );

   return "";
}

export default ModalLoginInput;
