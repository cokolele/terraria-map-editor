import React, { useState } from "react";
import { connect } from "react-redux";
import api from "/utils/api/api.js";

import ModalAccountButton from "/components/modal/account/button.jsx";

function ModalErrorReport({ close }) {
   const [text, setText] = useState("");
   const [contact, setContact] = useState("");
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

         if (file.size > 20*1024*1024) {
            setError("File exceeded size limit (20 MB)");
            return;
         }

         const fileData = new FormData();
         fileData.append("map", file);
         setFileData(fileData);
         setFileName(file.name);
      }
   }

   const onSubmit = async () => {
      if (text.trim())
         await api.post("/report/error", { text: contact + ": " + text });
      if (fileData)
         api.post("/report/error/map", fileData, false);
      close();
   }

   return (
      <div className="modal-sign">
         <span className="modal-sign-text">Almost all errors are being automatically logged and checked through. If your problem<br/>persists, let me know below. Please describe your problem with details.</span>
         <span className="modal-sign-text">If you have any problems loading or saving the map please send me your map file. It is<br/>much easier for me to find the problem if i can test it myself, hope you understand it.</span>
         <span className="modal-sign-text"></span>
         <span className="modal-sign-text"></span>
         <span className="modal-sign-text"></span>
         <textarea value={text} onChange={(e) => {setText(e.target.value)}} placeholder="Your problem, described with details..."/>
         <span className="modal-sign-text"></span>
         <textarea value={contact} onChange={(e) => {setContact(e.target.value)}} rows={1} placeholder="Any type of contact so i can get back to you (optional)..."/>
         <span className="modal-sign-text"></span>
         <ModalAccountButton label="Add attachment mapfile" onClick={onAddFile} text={fileName}/>
         <span className="modal-sign-text"></span>
         <ModalAccountButton label="SEND" onClick={onSubmit} primary error={error}/>
      </div>
   );
}

export default ModalErrorReport;

