import React from "react";

import "/components/styles/modal/sign/input-inline.css";

function ModalSignInputInline({ link, placeholder, onClick }) {
   const _onClick = e => {
      e.target.blur();
      onClick();
   }

   if (link)
      return (
         <a onClick={_onClick} className="modal-sign-input-inline">{placeholder}</a>
      );

   return "";
}

export default ModalSignInputInline;
