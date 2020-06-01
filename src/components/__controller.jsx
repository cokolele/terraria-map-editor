/*
    general namespace and controller for anything
*/

import React, { useEffect } from "react";
import { connect } from "react-redux";
import auth from "/utils/api/auth.js";
import { stateChange } from "/state/state.js";

import { canvasChangeState, canvasOnWorldFileChange } from "/app/canvas/main.js";

function Controller(props) {
    //page load
   useEffect(() => {
      async function loadSession() {
         const getUser = await auth.get("/user");
         if (getUser.id)
            props.stateChange("user", getUser);
      }

      loadSession();
   }, []);

   //canvas
   useEffect(() => {
      canvasChangeState(props.stateForCanvas);
   }, [props.stateForCanvas]);

   useEffect(() => {
      canvasOnWorldFileChange();
   }, [props.worldFileChange]);

   return null;
}

export default connect(
   state => {
      return {
         stateForCanvas: {
            canvas: state.canvas,
            toolbar: state.toolbar,
            optionbar: state.optionbar,
            layersVisibility: state.layersVisibility
         },
         worldFileChange: state.canvas.worldFile
      };
   },
   { stateChange }
)(Controller);
