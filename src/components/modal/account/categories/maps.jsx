import React, { useEffect, useState } from "react";
import api from "/utils/api/api.js";
import { connect } from "react-redux";
import { stateChangeWorldFile, stateChangeModal } from "/state/modules/app.js";
import { stateChangeDescription, stateChangeError } from "/state/modules/status.js";

import Button from "/components/modal/account/button.jsx";

import { verifyMapFile } from "/app/canvas/main.js";

function ModalAccountViewMap({ stateChangeWorldFile, stateChangeModal, stateChangeDescription, stateChangeError }) {
   const [maps, setMaps] = useState([]);
   const [selectedRow, setSelectedRow] = useState(null);
   const [error, setError] = useState("");

   const fetchMaps = async () => {
      const _maps = await api.get("/account/maps");

      if (_maps.status == "error") {
         setError(_maps.message);
         return;
      }

      setMaps(_maps);
   };

   useEffect(() => {
      fetchMaps();
   }, []);

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

         if (file.size > 20971520) {
            setError("File exceeded size limit (20 MB)");
            return;
         }

         try {
            const valid = await verifyMapFile(file);
            if (!valid) {
               setError("World file version is not supported (only 1.3.5.3) or corrupted metadata");
               return;
            }
         } catch(e) {
            console.error(e);
            setError("Unexpected error (see console for dev info)");
            return;
         }

         const fileData = new FormData();
         fileData.append("map", file);

         const mapUpload = await api.post("/account/maps", fileData, false);

         if (mapUpload.status != "ok") {
            setError(mapUpload.message);
            return;
         }

         fetchMaps();
      }
   }

   const onLoadMap = async () => {
      stateChangeDescription("Downloading map");
      stateChangeModal(null);
      let mapFile = await api.get("/account/maps/" + maps[selectedRow].id, "application/octet-stream");

      if (mapFile.status == "error") {
         stateChangeDescription("Failed to download map");
         stateChangeError(mapFile.message);
         return;
      }

      mapFile = new File([mapFile], maps[selectedRow].name);

      stateChangeWorldFile(mapFile);
   }

   const onDeleteMap = async () => {
      const mapDeleted = await api.delete("/account/maps/" + maps[selectedRow].id);

      if (mapDeleted.status != "ok") {
         setError(mapDeleted.message);
         return;
      }

      fetchMaps();
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
                  <div className={"modal-account-row" + (selectedRow == i ? " modal-account-row--selected" : "")} onClick={() => {setSelectedRow(i)}} tabIndex={i} key={i}>
                     <div className="modal-account-row-text modal-account-row-text--bold">{map.name}</div>
                     <div className="flex-filler"></div>
                     <div className="modal-account-row-text">{Math.round(map.size / 1024 / 1024 * 100) / 100 + " MB"}</div>
                  </div>
               ))
         }
         <div className="modal-account-button-container">
            <Button label={"+ Add File"} onClick={onAddFile} error={error}/>
            <div className="flex-filler"></div>
            <Button label={"Load"} disabled={ selectedRow !== null ? false : true } onClick={onLoadMap}/>
            <Button label={"Delete"} disabled={ selectedRow !== null ? false : true } onClick={onDeleteMap}/>
         </div>
      </div>
   );
}

export default connect(
   null,
   { stateChangeWorldFile, stateChangeModal, stateChangeDescription, stateChangeError }
)(ModalAccountViewMap);

