import React from "react";

import "/components/styles/modal/sign/button-inline-text.css";

function ModalSignButtonInlineText({ label, onClick }) {
   const _onClick = e => {
      e.target.blur();
      onClick();
   }

   return (
      <a onClick={_onClick} className="modal-sign-button-inline-text">{label}</a>
   );
}

export default ModalSignButtonInlineText;
