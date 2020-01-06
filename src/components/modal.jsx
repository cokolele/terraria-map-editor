import React, { useState } from "react";
import { connect } from "react-redux";
import { stateChangeModal } from "/state/modules/app.js";

import { CrossIcon } from "/components/icon.jsx";
import "/components/styles/modal.css";

import ModalSignin from "/components/modal/signin.jsx";
import ModalSignup from "/components/modal/signup.jsx";
import ModalAccount from "/components/modal/account.jsx";

const Modal = ({ modalView, stateChangeModal }) => {
   let ViewComponent;
   if (modalView == "signin")
      ViewComponent = ModalSignin;
   else if (modalView == "signup")
      ViewComponent = ModalSignup;
   else if (modalView == "account")
      ViewComponent = ModalAccount;

   const onClose = () => {
      stateChangeModal(null);
   }

   if (!modalView)
      return "";
   else
      return (
         <div className="modal-background">
            <div className="modal-container">
               <button className="modal-button-close" type="button" onClick={onClose}>
                  <CrossIcon size={28}/>
               </button>
               <ViewComponent/>
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
