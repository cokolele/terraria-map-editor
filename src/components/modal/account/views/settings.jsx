import React from "react";
import { connect } from "react-redux";
import { stateChangeUser, stateChangeModal } from "/state/modules/app.js";
import auth from "/utils/api/auth.js";

import Button from "/components/modal/account/button.jsx";

function ModalAccountViewSettings({ stateChangeModal, stateChangeUser }) {
   const onLogOut = async () => {
      const logout = await auth.post("/logout");

      if (logout.status != "ok") {
         console.error(logout.message);
         return;
      }

      stateChangeUser(null);
      stateChangeModal(null);
   }

   return (
      <div className="modal-account-view-settings">
         <Button label={"Log Out"} onClick={onLogOut} primary/>
      </div>
   );
}

export default connect(
   null,
   { stateChangeUser, stateChangeModal }
)(ModalAccountViewSettings);
