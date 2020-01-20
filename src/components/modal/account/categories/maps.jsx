import React, { useEffect, useState } from "react";
import api from "/utils/api/api.js";

import Button from "/components/modal/account/button.jsx";

function ModalAccountViewMap() {
   const [maps, setMaps] = useState([]);
   const [error, setError] = useState("");

   useEffect(() => {
      async function fetchMaps() {
         setMaps(await api.get("/account/maps"));
      }

      fetchMaps();
   }, []);

   const onAddFile = (e, file) => {
      if (!file) {
         const inputElHidden = document.createElement("input");
         inputElHidden.setAttribute("type", "file");
         inputElHidden.setAttribute("accept", ".wld");
         inputElHidden.addEventListener("input", async () => {
            onAddFile(null, inputElHidden.files[0]);
         });
         inputElHidden.click();
      } else {
         if (!file.name.includes(".wld")) {
            setError("Please select .wld file format");
            return;
         }

         if (file.size > 20971520) {
            setError("File exceeded size limit (20 MB)");
            return;
         }

         setError("");
         console.log(file);
      }
   }

   return (
      <div className="modal-account-view-maps">
         {
            maps.length == 0 ?
               <div className="modal-account-view-row">
                  <div className="modal-account-row-text--header-disabled">You can save your maps here...</div>
               </div>
            :
               maps.map((map, i) => (
                  <div className="modal-account-row" key={i}>
                     <div className="modal-account-row-text modal-account-row-text--bold">{map.filepath}</div>
                  </div>
               ))
         }
         <Button label={"+ Add File"} onClick={onAddFile} error={error}/>
      </div>
   );
}

export default ModalAccountViewMap;
