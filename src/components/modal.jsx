import React, { useState } from "react";
import { connect } from "react-redux";
import { stateChangeModal } from "/state/modules/app.js";

import { CrossIcon } from "/components/icon.jsx";
import "/components/styles/modal.css";
import ModalSignin from "/components/modal/signin.jsx";
import ModalSignup from "/components/modal/signup.jsx";
import ModalAccount from "/components/modal/account.jsx";
import ErrorReport from "/components/modal/errorreport.jsx";


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
   }
};

const Modal = ({ modalView, stateChangeModal }) => {
   if (!modalView)
      return "";

   const View = config[modalView].View;

   const onClose = () => {
      stateChangeModal(null);
   }

   return (
      <div className="modal-background">
         <div className="modal-container">
            <div className="modal-header">
               <div className="modal-header-text">{config[modalView].label}</div>
               <button className="modal-button-close" type="button" onClick={onClose}>
                  <CrossIcon size={28}/>
               </button>
            </div>
            <View/>
         </div>
      </div>
   );
}

export default connect(
   state => {
      return {
         modalView: state.app.modal
      };
   },
   { stateChangeModal }
)(Modal);
