import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateChangeUser, stateChangeModal } from "/state/modules/app.js";
import api from "/utils/api/api.js";

import ModalSignInput from "/components/modal/sign/input.jsx";
import ModalSignOption from "/components/modal/sign/option.jsx";
import ModalSignButton from "/components/modal/sign/button.jsx";
import "/components/styles/modal/sign.css";

function ModalSignup({ stateChangeUser, stateChangeModal }) {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [password2, setPassword2] = useState("");
   const [email, setEmail] = useState("");
   const [usernameError, setUsernameError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const [password2Error, setPassword2Error] = useState("");
   const [emailError, setEmailError] = useState("");
   const [submitError, setSubmitError] = useState("");

   useEffect(() => {
      const keyDownHandler = (e) => {
         if (e.code == "Escape")
            stateChangeModal(null);
         else if (e.code == "Enter" || e.code == "NumpadEnter")
            onSubmit();
      };

      window.addEventListener("keydown", keyDownHandler);
      return () => {
         window.removeEventListener("keydown", keyDownHandler);
      };
   }, [username, password, password2, email]);

   const usernameRegexp = /^[a-z0-9_-]{3,16}$/;
   const checkInputsErrors = () => {
      const usernameLength = username.trim().length;
      const passwordLength = password.trim().length;
      let _usernameError, _passwordError, _password2Error, _emailError;

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

      if (password2 !== password)
         _password2Error = "Password don't match";
      else
         _password2Error = "";

      if (email.trim().length === 0)
         _emailError = "Empty email";
      else
         _emailError = "";

      setUsernameError(_usernameError);
      setPasswordError(_passwordError);
      setPassword2Error(_password2Error);
      setEmailError(_emailError);

      if (_passwordError === "" && _usernameError === "" && _password2Error === "" && _emailError === "")
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

      const register = await api.post("/session/register", {
         username,
         password,
         email
      });

      if (register.status != "ok") {
         setSubmitError(register.message);
         return;
      }

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
         setSubmitError(session.message);
         return;
      }

      stateChangeUser(session.user);
      stateChangeModal(null);
   }

   const onClickSignIn = () => {
      stateChangeModal("signin");
   }

   return (
      <div className="modal-sign">
         <ModalSignInput text placeholder="username" value={username} setValue={setUsername} onBlur={onInputsBlur} errorMessage={usernameError}/>
         <ModalSignInput password placeholder="password" value={password} setValue={setPassword} onBlur={onInputsBlur} errorMessage={passwordError}/>
         <ModalSignInput password placeholder="password again" value={password2} setValue={setPassword2} onBlur={onInputsBlur} errorMessage={password2Error}/>
         <ModalSignInput text placeholder="e-mail address" value={email} setValue={setEmail} onBlur={onInputsBlur} errorMessage={emailError}/>
         <ModalSignButton label="SIGN IN" onClick={onSubmit} error={submitError}/>
         <span className="modal-sign-text">
            <span>Already have an account ?</span>
            <ModalSignOption link placeholder="SIGN IN" onClick={onClickSignIn}/>
         </span>
      </div>
   );
}

export default connect(
   null,
   { stateChangeUser, stateChangeModal }
)(ModalSignup);

