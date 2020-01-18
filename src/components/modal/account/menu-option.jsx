import React from "react";

import "/components/styles/modal/account/menu-option.css";

function ModalAccountMenuItem({ label, selected, onClick, onClickReturnParam }) {
   const _onClick = () => {
      onClick(onClickReturnParam);
   }

   return (
      <div className={"modal-account-menu-option" + (selected ? " modal-account-menu-option--selected" : "")} onClick={_onClick}>
         {label}
      </div>
   );
}


export default ModalAccountMenuItem;
