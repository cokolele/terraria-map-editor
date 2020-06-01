import React from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";
import auth from "/utils/api/auth.js";

import Button from "/components/modal/account/button.jsx";

function ModalAccountViewSettings({ close, stateChange }) {
   const onLogOut = async () => {
      const logout = await auth.post("/logout");

      if (logout.status != "ok") {
         console.error(logout.message);
         return;
      }

      stateChange("user", null);
      close()
   }

   return (
      <div className="modal-account-view-settings">
         <Button label={"Log Out"} onClick={onLogOut} primary/>
      </div>
   );
}

export default connect(
   null,
   { stateChange }
)(ModalAccountViewSettings);
