import React from "react";

import "/components/styles/modal/sign/option.css";

function ModalSignInputInline({ label, onClick }) {
   const _onClick = e => {
      e.target.blur();
      onClick();
   }

   return (
      <a onClick={_onClick} className="modal-sign-input-inline">{label}</a>
   );
}

export default ModalSignInputInline;
