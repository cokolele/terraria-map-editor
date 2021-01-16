import React, { useState } from "react";
import { connect } from "react-redux";

import LAYERS from "/utils/dbs/LAYERS.js";
import extensionBlockReplace from "/canvas/extensions/blockReplace.js";

import OptionbarOptionLayer from "/components/optionbar/layer.jsx";
import OptionbarOptionId from "/components/optionbar/id.jsx";
import ModalAccountButton from "/components/modal/account/button.jsx";

import "/components/styles/modal/replaceBlock.css";

function ModalReplaceBlock({ close }) {
   const [from, setFrom] = useState({
      layer: LAYERS.TILES,
      id: 0,
      ordered: false
   })

   const [to, setTo] = useState({
      layer: LAYERS.TILES,
      id: 1,
      ordered: false
   })

   const onClick = () => {
      extensionBlockReplace(from, to);
      close();
   }

   return (
      <div className="modal-sign modal-replaceBlock">
         <span className="modal-sign-text"></span>
         <span className="modal-span--inline optionbar">
            <OptionbarOptionLayer state={from} setState={setFrom}/>
            <div className="optionbar-divider"></div>
            <OptionbarOptionId state={from} setState={setFrom}/>
         </span>
         <div className="modal-text--center modal-text--h2">for</div>
         <span className="modal-span--inline optionbar">
            <OptionbarOptionLayer state={to} setState={setTo}/>
            <div className="optionbar-divider"></div>
            <OptionbarOptionId state={to} setState={setTo}/>
         </span>
         <span className="modal-sign-text"></span>
         <span className="modal-sign-text"></span>
         <div className="modal-account-button-container">
            <ModalAccountButton label="Replace" onClick={onClick} primary/>
         </div>
      </div>
   );
}

export default ModalReplaceBlock;

