import React from "react";
import { connect } from "react-redux";
import { changeUser, changeModal } from "/state/modules/app.js";

import ModalSignInputInline from "/components/modal/sign/input-inline.jsx"

import api from "/utils/api/api.js";

function ModalAccountCategoryAccount({ changeModal, changeUser }) {
   const onLogOut = async () => {
      const logout = await api.post("/session/logout");

      if (logout.status != "ok") {
         console.log(logout.message);
         return;
      }

      changeUser(null);
      changeModal(null);
   }

   return <ModalSignInputInline link placeholder="Log out" onClick={onLogOut}/>
}

export default connect(
   null,
   { changeUser, changeModal }
)(ModalAccountCategoryAccount);
