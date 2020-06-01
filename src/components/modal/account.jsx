import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import api from "/utils/api/api.js";

import ModalAccountViewSettings from "/components/modal/account/views/settings.jsx";
import ModalAccountViewMaps from "/components/modal/account/views/maps.jsx";
import "/components/styles/modal/account.css";

const config = [
   {
      label: "Saved maps",
      View: ModalAccountViewMaps
   },
   {
      label: "Settings",
      View: ModalAccountViewSettings,
   },
];

function ModalAccount({ close, stateChange }) {
   const [selectedCategory, setSelectedCategory] = useState(0);
   const ModalAccountCategoryView = config[selectedCategory].View;

   const onMenuItemClick = (i) => {
      setSelectedCategory(i);
   }

   return (
      <div className="modal-account">
         <div className="modal-account-menu">
            {
               config.map(({ label }, i) => (
                  <div className={"modal-account-menu-option" + (i == selectedCategory ? " modal-account-menu-option--selected" : "")} onClick={() => {setSelectedCategory(i)}} key={i}>
                     {label}
                  </div>
               ))
            }
         </div>
         <div className="modal-account-view">
            <ModalAccountCategoryView close={close}/>
         </div>
      </div>
   );
}

export default ModalAccount;

