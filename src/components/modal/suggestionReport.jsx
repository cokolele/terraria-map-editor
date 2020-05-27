import React, { useState } from "react";
import { connect } from "react-redux";
import { stateChangeModal } from "/state/modules/app.js";
import api from "/utils/api/api.js";

import ModalAccountButton from "/components/modal/account/button.jsx";

function ModalSuggestionReport({ stateChangeModal }) {
   const [text, setText] = useState("");

   const onSubmit = async () => {
      if (text.trim())
         await api.post("/report/suggestion", { text });
      stateChangeModal("");
   }

   return (
      <div className="modal-sign">
         <span className="modal-sign-text">I plan to implement all required features to be able to edit ANY data in map file, including<br/>chests, signs and so on. But if you have anything on your mind about the site, please let<br/>me know below.</span>
         <span className="modal-sign-text"></span>
         <span className="modal-sign-text"></span>
         <span className="modal-sign-text"></span>
         <textarea value={text} onChange={(e) => {setText(e.target.value)}} placeholder="Your suggestion / request..."/>
         <span className="modal-sign-text"></span>
         <ModalAccountButton label="SEND" onClick={onSubmit} primary/>
      </div>
   );
}

export default connect(
   null,
   { stateChangeModal }
)(ModalSuggestionReport);

