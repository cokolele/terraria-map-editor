import React, { useState } from "react";
import { connect } from "react-redux";
import { changeModal } from "/state/modules/app.js";

import { CrossIcon } from "/components/icon.jsx";
import "/components/styles/modal.css";

import Login from "/components/modal/login.jsx";
import Register from "/components/modal/register.jsx";

const Modal = ({ modalView, changeModal }) => {
   let ViewComponent;
   if (modalView == "login")
      ViewComponent = Login;
   else if (modalView == "register")
      ViewComponent = Register;

   const onClose = () => {
      changeModal(null);
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
   { changeModal }
)(Modal);
