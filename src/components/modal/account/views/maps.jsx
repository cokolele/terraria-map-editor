import React, { useEffect, useState } from "react";
import api from "/utils/api/api.js";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";

import Button from "/components/modal/account/button.jsx";

import verifyWorldFileFormat from "/canvas/extensions/verifyWorldFileFormat.js";

function ModalAccountViewMap({ close, stateChange }) {
   const [maps, setMaps] = useState([]);
   const [selectedRow, setSelectedRow] = useState(null);
   const [error, setError] = useState("");

   const fetchMaps = async () => {
      const _maps = await api.get("/user/maps");

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

         if (file.size > 20*1024*1024) {
            setError("File exceeded size limit (20 MB)");
            return;
         }

         const valid = await verifyWorldFileFormat(file);
         if (!valid)
            setError("Invalid world file format");

         const fileData = new FormData();
         fileData.append("map", file);

         const mapUpload = await api.post("/user/maps", fileData, false);

         if (mapUpload.status != "ok") {
            setError(mapUpload.message);
            return;
         }

         setError("");
         fetchMaps();
      }
   }

   const onLoadMap = async () => {
      stateChange(["status", "description"], "Downloading map");
      close();

      let mapFile = await api.get("/user/maps/" + maps[selectedRow].id, "application/octet-stream");

      if (mapFile.status == "error") {
         stateChange(["status", "description"], "Map download failed");
         stateChange(["status", "error"], mapFile.message);
         return;
      }

      mapFile = new File([mapFile], maps[selectedRow].name);
      stateChange(["canvas", "worldFile"], mapFile);
   }

   const onDeleteMap = async () => {
      const mapDeleted = await api.delete("/user/maps/" + maps[selectedRow].id);

      if (mapDeleted.status != "ok") {
         setError(mapDeleted.message);
         return;
      }

      setSelectedRow(null);
      setError("");
      fetchMaps();
   }

   return (
      <div className="modal-account-view-maps">
         {
            maps.length == 0 ?
               <div className="modal-account-view-row">
                  <div className="modal-account-row-text--header-disabled">Here you can save your maps</div>
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
            <Button label={"+ Add File"} onClick={onAddFile} error={error} primary/>
            <div className="flex-filler"></div>
            <Button label={"Load"} disabled={ selectedRow !== null ? false : true } onClick={onLoadMap}/>
            <Button label={"Delete"} disabled={ selectedRow !== null ? false : true } onClick={onDeleteMap}/>
         </div>
      </div>
   );
}

export default connect(
   null,
   { stateChange }
)(ModalAccountViewMap);

