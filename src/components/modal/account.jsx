import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeUser, changeModal } from "/state/modules/app.js";

import api from "/utils/api/api.js";

import { AccountBoxIcon, FolderIcon } from "/components/icon.jsx";
import ModalAccountMenu from "/components/modal/account/menu.jsx";
import ModalAccountCategoryAccount from "/components/modal/account/category-account.jsx";
import ModalAccountCategoryMaps from "/components/modal/account/category-maps.jsx";
import "/components/styles/modal/account.css";

const categoriesConfig = [
   {
      label: "Account",
      Icon: AccountBoxIcon,
      View: ModalAccountCategoryAccount,
   },
   {
      label: "Saved maps",
      Icon: FolderIcon,
      View: ModalAccountCategoryMaps
   }
];

function ModalAccount({ changeUser, changeModal }) {
   useEffect(() => {
      const keyDownHandler = (e) => {
         if (e.code == "Escape")
            changeModal(null);
      };

      window.addEventListener("keydown", keyDownHandler);
      return () => {
         window.removeEventListener("keydown", keyDownHandler);
      };
   }, []);

   const [selectedCategory, setSelectedCategory] = useState(0);
   const ModalAccountCategoryView = categoriesConfig[selectedCategory].View;

   return (
      <div className="modal-account">
         <ModalAccountMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoriesConfig={categoriesConfig}/>
         <div className="modal-account-view">
            <ModalAccountCategoryView/>
         </div>
      </div>
   );
}

export default connect(
   null,
   { changeUser, changeModal }
)(ModalAccount);

