import React, { useState } from "react";
import { connect } from "react-redux";
import { stateChangeModal } from "/state/modules/app.js";
import api from "/utils/api/api.js";

import ModalAccountButton from "/components/modal/account/button.jsx";
import ModalSignButton from "/components/modal/sign/button.jsx";
import "/components/styles/modal/sign.css";

function ModalErrorReport({ stateChangeModal }) {
   const [text, setText] = useState("");
   const [error, setError] = useState("");
   const [fileData, setFileData] = useState(undefined);
   const [fileName, setFileName] = useState("");

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

         const fileData = new FormData();
         fileData.append("map", file);
         setFileData(fileData);
         setFileName(file.name);
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
         <span className="modal-sign-text">If you got an error loading or saving the map, please send me your file.</span>
         <span className="modal-sign-text">Having other troubles ? Any feature request ? Tell me about it</span>
         <span className="modal-sign-text"></span>
         <span className="modal-sign-text"></span>
         <textarea value={text} onChange={(e) => {setText(e.target.value)}} placeholder="Here :)"/>
         <span className="modal-sign-text"></span>
         <ModalAccountButton label={"Add attachment mapfile"} onClick={onAddFile} text={fileName}/>
         <span className="modal-sign-text"></span>
         <span className="modal-sign-text"></span>
         <ModalSignButton label="SEND" onClick={send}/>
      </div>
   );
}

export default connect(
   null,
   { stateChangeModal }
)(ModalErrorReport);

