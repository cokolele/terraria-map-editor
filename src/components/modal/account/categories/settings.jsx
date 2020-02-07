import React from "react";
import { connect } from "react-redux";
import { stateChangeUser, stateChangeModal } from "/state/modules/app.js";

import Button from "/components/modal/account/button.jsx";
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
         <Button label={"Log Out"} onClick={onLogOut}/>
      </div>
   );
}

export default connect(
   null,
   { stateChangeUser, stateChangeModal }
)(ModalAccountViewSettings);
