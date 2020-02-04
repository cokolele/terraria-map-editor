import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StateChangeUser, stateChangeModal } from "/state/modules/app.js";
import api from "/utils/api/api.js";

import ModalAccountViewSettings from "/components/modal/account/categories/settings.jsx";
import ModalAccountViewMaps from "/components/modal/account/categories/maps.jsx";
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

function ModalAccount({ StateChangeUser, stateChangeModal }) {
   useEffect(() => {
      const keyDownHandler = (e) => {
         if (e.code == "Escape")
            stateChangeModal(null);
      };

      window.addEventListener("keydown", keyDownHandler);
      return () => {
         window.removeEventListener("keydown", keyDownHandler);
      };
   }, []);

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
            <ModalAccountCategoryView/>
         </div>
      </div>
   );
}

export default connect(
   null,
   { StateChangeUser, stateChangeModal }
)(ModalAccount);

