import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeUser, changeModal } from "/state/modules/app.js";

import api from "/utils/api/api.js";

import ModalLoginInput from "/components/modal/login-input.jsx";
import ModalLoginInputInline from "/components/modal/login-input-inline.jsx"
import "/components/styles/modal/login.css";

function ModalLogin({ changeUser, changeModal }) {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [usernameError, setUsernameError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const [submitError, setSubmitError] = useState("");

   useEffect(() => {
      const keyDownHandler = (e) => {
         if (e.code == "Escape")
            changeModal(null);
         else if (e.code == "Enter" || e.code == "NumpadEnter")
            onSubmit();
      };

      window.addEventListener("keydown", keyDownHandler);
      return () => {
         window.removeEventListener("keydown", keyDownHandler);
      };
   }, []);

   const usernameRegexp = /^[a-z0-9_-]{3,16}$/;
   const checkInputsErrors = () => {
      const usernameLength = username.trim().length;
      const passwordLength = password.trim().length;
      let _usernameError, _passwordError;

      if (usernameLength === 0)
         _usernameError = "Empty username";
      else if (usernameLength < 3)
         _usernameError = "Username must be longer than 3 characters";
      else if (usernameLength > 16)
         _usernameError = "Username must be shorther than 16 characters";
      else if (!usernameRegexp.test(username))
         _usernameError = "Username can contain only: letters , - , _";
      else
         _usernameError = "";

      if (passwordLength === 0)
         _passwordError = "Empty password";
      else if (passwordLength > 55)
         _passwordError = "Password must be shorther than 55 characters";
      else
         _passwordError = "";

      setUsernameError(_usernameError);
      setPasswordError(_passwordError);

      if (_passwordError === "" && _usernameError === "")
         return true;
      return false;
   }

   const onInputsBlur = (e) => {
      if (e.relatedTarget === null)
         checkInputsErrors();
   }

   const onSubmit = async () => {
      if (!checkInputsErrors())
         return;

      const login = await api.post("/session/login", {
         username,
         password
      });

      if (login.status != "ok") {
         setSubmitError(login.message);
         return;
      }

      const session = await api.get("/session");

      if (session.status != "ok") {
         setSubmitError(session.error);
      }

      changeUser(session.user);
      changeModal(null);
   }

   const onClickSignUp = () => {
      changeModal("register");
   }

   return (
      <div className="modal-login">
         <span className="modal-login-headtext">Sign In</span>
         <ModalLoginInput text placeholder="username" value={username} setValue={setUsername} onBlur={onInputsBlur} errorMessage={usernameError}/>
         <ModalLoginInput password placeholder="password" value={password} setValue={setPassword} onBlur={onInputsBlur} errorMessage={passwordError}/>
         <ModalLoginInput submit onClick={onSubmit} value="SIGN IN" errorMessage={submitError}/>
         <span className="modal-login-text">
            <ModalLoginInputInline link placeholder="Forgot username" onClick={e => {console.log("clicked")}}/>
            <span>·</span>
            <ModalLoginInputInline link placeholder="Forgot password" onClick={e => {console.log("clicked")}}/>
         </span>
         <span className="modal-login-text">
            <span>Need an account ?</span>
            <ModalLoginInputInline link placeholder="SIGN UP" onClick={onClickSignUp}/>
         </span>
      </div>
   );
}

export default connect(
   null,
   { changeUser, changeModal }
)(ModalLogin);

