import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateChange } from "/state/state.js";
import auth from "/utils/api/auth.js";

import ModalSignInput from "/components/modal/sign/input.jsx";
import ModalSignButtonInlineText from "/components/modal/sign/button-inline-text.jsx";
import ModalSignButton from "/components/modal/sign/button.jsx";
import "/components/styles/modal/sign.css";

function ModalSignin({ close, stateChange }) {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState({});

   useEffect(() => {
      const keyDownHandler = (e) => {
         if (e.code == "Enter" || e.code == "NumpadEnter")
            onSubmit();
      };

      window.addEventListener("keydown", keyDownHandler);
      return () => {
         window.removeEventListener("keydown", keyDownHandler);
      };
   }, [username, password]);

   const usernameRegexp = /^[a-z0-9_-]{3,16}$/;
   const checkInputsErrors = () => {
      const usernameLength = username.trim().length;
      const passwordLength = password.trim().length;

      if (usernameLength === 0)
         errors.username = "Empty username";
      else if (usernameLength < 3)
         errors.username = "Username must be longer than 3 characters";
      else if (usernameLength > 16)
         errors.username = "Username must be shorther than 16 characters";
      else if (!usernameRegexp.test(username))
         errors.username = "Username can contain only: letters , - , _";
      else
         delete errors.username;

      if (passwordLength === 0)
         errors.password = "Empty password";
      else if (passwordLength > 55)
         errors.password = "Password must be shorther than 55 characters";
      else
         delete errors.password;

      setErrors({...errors});
      delete errors.submit;
      return Object.entries(errors).length === 0 ? true : false;
   }

   const onInputBlur = (e) => {
      if (e.relatedTarget === null)
         checkInputsErrors();
   }

   const onSubmit = async () => {
      if (!checkInputsErrors())
         return;

      const userLogin = await auth.post("/login", {
         username,
         password
      });

      if (userLogin.status != "ok") {
         errors.submit = userLogin.message;
         setErrors({...errors});
         return;
      }

      stateChange("user", userLogin.user);
      close();
   }

   const onClickSignUp = () => {
      stateChange("modal", "signup");
   }

   return (
      <div className="modal-sign">
         <ModalSignInput label="username" value={username} onChange={setUsername} onBlur={onInputBlur} error={errors.username}/>
         <ModalSignInput label="password" value={password} onChange={setPassword} onBlur={onInputBlur} error={errors.password} password />
         <ModalSignButton label="SIGN IN" onClick={onSubmit} error={errors.submit}/>
         <span className="modal-sign-text">
            <ModalSignButtonInlineText link label="Forgot username" onClick={e => {console.log("clicked")}}/>
            <span>·</span>
            <ModalSignButtonInlineText link label="Forgot password" onClick={e => {console.log("clicked")}}/>
         </span>
         <span className="modal-sign-text">
            <span>Need an account ?</span>
            <ModalSignButtonInlineText label="SIGN UP" onClick={onClickSignUp}/>
         </span>
      </div>
   );
}

export default connect(
   null,
   { stateChange }
)(ModalSignin);

