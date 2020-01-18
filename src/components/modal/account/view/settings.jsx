import React from "react";
import { connect } from "react-redux";
import { stateChangeUser, stateChangeModal } from "/state/modules/app.js";

import ModalSignInputInline from "/components/modal/sign/input-inline.jsx"
import "/components/styles/modal/account/view/settings.css";

import api from "/utils/api/api.js";

function ModalAccountViewSettings({ stateChangeModal, stateChangeUser }) {
   const onLogOut = async () => {
      const logout = await api.post("/session/logout");

      if (logout.status != "ok") {
         console.log(logout.message);
         return;
      }

      stateChangeUser(null);
      stateChangeModal(null);
   }

   return (
      <div className="modal-account-view-settings">
         <ModalSignInputInline link placeholder="Log out" onClick={onLogOut}/>
      </div>
   );
}

export default connect(
   null,
   { stateChangeUser, stateChangeModal }
)(ModalAccountViewSettings);
