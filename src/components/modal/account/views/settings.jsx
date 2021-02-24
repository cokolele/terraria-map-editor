import { connect } from "react-redux";
import { stateChange } from "src/state/state.js";
import auth from "src/utils/api/auth.js";

import Button from "src/components/modal/account/button.jsx";

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
