import React from "react";

import "/components/styles/modal/account/menu.css";

function ModalAccountMenu({ selectedCategory, setSelectedCategory, categoriesConfig }) {
   return (
      <div className="modal-account-menu">
      {
         categoriesConfig.map(({ label, Icon }, i) => (
            <div className={"modal-account-menu-category" + (i == selectedCategory ? " modal-account-menu-category--selected" : "")} onClick={() => {setSelectedCategory(i)}} key={i}>
               <Icon size="auto"/>
               {label}
            </div>
         ))
      }
      </div>
   );
}
export default ModalAccountMenu;
