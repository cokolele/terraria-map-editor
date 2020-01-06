import React from "react";
import { connect } from "react-redux";
import { stateChangeUser, stateChangeModal } from "/state/modules/app.js";

import ModalSignInputInline from "/components/modal/sign/input-inline.jsx"

import api from "/utils/api/api.js";

function ModalAccountCategoryAccount({ stateChangeModal, stateChangeUser }) {
   const onLogOut = async () => {
      const logout = await api.post("/session/logout");

      if (logout.status != "ok") {
         console.log(logout.message);
         return;
      }

      stateChangeUser(null);
      stateChangeModal(null);
   }

   return <ModalSignInputInline link placeholder="Log out" onClick={onLogOut}/>
}

export default connect(
   null,
   { stateChangeUser, stateChangeModal }
)(ModalAccountCategoryAccount);
