import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { store } from "/state/store.js";
import { stateChange } from "/state/state.js";

import { CrossIcon } from "/components/icon.jsx";
import "/components/styles/modal.css";

import ModalSignin from "/components/modal/signin.jsx";
import ModalSignup from "/components/modal/signup.jsx";
import ModalAccount from "/components/modal/account.jsx";
import ErrorReport from "/components/modal/errorReport.jsx";
import SuggestionReport from "/components/modal/suggestionReport.jsx";
import SavingDisclaimer from "/components/modal/savingDisclaimer.jsx";
import ReplaceBlock from "/components/modal/replaceBlock.jsx";
import ModalConfirmation from "/components/modal/confirmation.jsx";

const config = {
   signin: {
      label: "Sign In",
      View: ModalSignin
   },
   signup: {
      label: "Sign Up",
      View: ModalSignup
   },
   account: {
      label: "Account",
      View: ModalAccount
   },
   errorreport: {
      label: "Error report",
      View: ErrorReport
   },
   suggestionreport: {
      label: "Suggestions report",
      View: SuggestionReport
   },
   savingdisclaimer: {
      label: "Please be careful",
      View: SavingDisclaimer
   },
   replaceblock: {
      label: "Replace block type",
      View: ReplaceBlock
   },
   confirmation: {
      label: "Confirmation",
      View: ModalConfirmation
   }
};

const Modal = ({ modalState, stateChange }) => {
   if (modalState === null)
      return "";

   let View, label, props;

   if (config[modalState]) {
      View = config[modalState].View;
      label = config[modalState].label;
   } else if (config[modalState[0]]) {
      View = config[modalState[0]].View;
      label = config[modalState[0]].label;
      props = modalState[1];
   } else {
      return "";
   }

   const onClose = () => {
      stateChange("modal", null);
   }

   const onModalClick = (e) => {
      if (e.target.classList.contains("modal-background"))
         onClose();
   }

   useEffect(() => {
      const keyDownHandler = (e) => {
         if (e.code == "Escape")
            onClose();
      };

      window.addEventListener("keydown", keyDownHandler);
      return () => {
         window.removeEventListener("keydown", keyDownHandler);
      };
   }, []);

   return (
      <div className="modal-background" onClick={onModalClick}>
         <div className="modal-container">
            <div className="modal-header">
               <div className="modal-header-text">{label}</div>
               <button className="modal-button-close" type="button" onClick={onClose}>
                  <CrossIcon size={28}/>
               </button>
            </div>
            <View close={onClose} {...props}/>
         </div>
      </div>
   );
}

export default connect(
   state => {
      return {
         modalState: state.modal
      };
   },
   { stateChange }
)(Modal);
