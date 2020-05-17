import React, { useState } from "react";
import { connect } from "react-redux";
import { stateChangeModal } from "/state/modules/app.js";
import api from "/utils/api/api.js";

import ModalSignInput from "/components/modal/sign/input.jsx";
import ModalSignButton from "/components/modal/sign/button.jsx";
import "/components/styles/modal/sign.css";

function ModalErrorReport({ stateChangeModal }) {

   const [text, setText] = useState("");

   const send = async () => {
      await api.post("/error", {
         error: text
      });
      stateChangeModal("");
   }

   return (
      <div className="modal-sign">
         <span className="modal-sign-text">Please report the error to make fixing them easier and quicker</span>
         <span className="modal-sign-text">1. press f12</span>
         <span className="modal-sign-text">2. select console tab</span>
         <span className="modal-sign-text">3. copy the console text below</span>
         <span className="modal-sign-text"></span>
         <textarea value={text} onChange={(e) => {setText(e.target.value)}} />
         <ModalSignButton label="SEND" onClick={send}/>
      </div>
   );
}

export default connect(
   null,
   { stateChangeModal }
)(ModalErrorReport);

