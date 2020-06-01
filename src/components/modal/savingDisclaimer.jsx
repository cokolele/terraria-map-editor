import React, { useState } from "react";
import { connect } from "react-redux";
import { localSettings, saveToLocalSettings } from "/utils/localStorage.js";
import useToggle from "/utils/hooks/useToggle.js";

import InputCheckbox from "/components/inputs/input-checkbox.jsx";
import ModalAccountButton from "/components/modal/account/button.jsx";

function ModalSavingDisclaimer({ close }) {
   const [checked, setChecked] = useState(localSettings.savingDisclaimerChecked ? true : false);

   const onBoxClick = (value) => {
      setChecked(value);
      saveToLocalSettings("savingDisclaimerChecked", value);
   }

   return (
      <div className="modal-sign">
         <span className="modal-sign-text">Keep in mind that this site is third party software. I, nor Re-Logic, are <span style={{fontWeight: 700, fontSize: "1.2rem", padding: "0 0.2rem", color: "#ffe300"}}>not responsible</span> for any data loss.</span>
         <span className="modal-sign-text">Always <span style={{fontWeight: 700, fontSize: "1.2rem", padding: "0 0.2rem", color: "#ffe300"}}>make backup</span> of your map files. No software is bug-free.</span>
         <span className="modal-sign-text"></span>
         <span className="modal-sign-text"></span>
         <ModalAccountButton label="I UNDERSTAND" onClick={close} primary/>
         <span className="modal-sign-text"><InputCheckbox label="Do not show again" value={checked} onChange={onBoxClick}/></span>
      </div>
   );
}

export default ModalSavingDisclaimer;

