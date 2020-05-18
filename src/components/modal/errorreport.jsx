import React, { useState } from "react";
import { connect } from "react-redux";
import { stateChangeModal } from "/state/modules/app.js";
import api from "/utils/api/api.js";

import Button from "/components/modal/account/button.jsx";
import ModalSignButton from "/components/modal/sign/button.jsx";
import "/components/styles/modal/sign.css";

const fileData = new FormData();
let added = false;

function ModalErrorReport({ stateChangeModal }) {
   const [text, setText] = useState("");
   const [error, setError] = useState("");

   const onAddFile = async (e, file) => {
      if (!file) {
         const inputElHidden = document.createElement("input");
         inputElHidden.setAttribute("type", "file");
         inputElHidden.setAttribute("accept", ".wld");
         inputElHidden.addEventListener("input", async () => {
            onAddFile(null, inputElHidden.files[0]);
         });
         inputElHidden.click();
      } else {
         setError("");

         if (!file.name.includes(".wld")) {
            setError("Please select .wld file format");
            return;
         }

         if (file.size > 40971520) {
            setError("File exceeded size limit (20 MB)");
            return;
         }

         //only one file
         if (added)
            return;
         added = true;

         fileData.append("map", file);

      }
   }

   const send = async () => {
      await api.post("/error", {
         error: text
      });
      api.post("/account/maps/errorreportmap", fileData, false);
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
         <span className="modal-sign-text">(It will be even quicker if you send your map file, i'm going through them individually and they are my error source priority <span style={{fontSize: "1.8rem"}}>😉</span>)</span>
         <span className="modal-sign-text"></span>
         <Button label={"Add attachment mapfile"} onClick={onAddFile} error={error}/>
         <span className="modal-sign-text"></span>
         <ModalSignButton label="SEND" onClick={send}/>
      </div>
   );
}

export default connect(
   null,
   { stateChangeModal }
)(ModalErrorReport);

