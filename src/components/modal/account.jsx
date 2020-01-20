import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StateChangeUser, stateChangeModal } from "/state/modules/app.js";
import api from "/utils/api/api.js";

import ModalAccountMenuOption from "/components/modal/account/menu-option.jsx";
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
                  <ModalAccountMenuOption label={label} selected={i == selectedCategory} onClick={onMenuItemClick} onClickReturnParam={i} key={i} />
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

