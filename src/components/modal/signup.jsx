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
   const [errors, setErrors] = useState({});

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

      if (password2 !== password)
         errors.password2 = "Password don't match";
      else
         delete errors.password2;

      if (email.trim().length === 0)
         errors.email = "Empty email";
      else
         delete errors.email;

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

      const register = await api.post("/session/register", {
         username,
         password,
         email
      });

      if (register.status != "ok") {
         errors.submit = register.message;
         setErrors({...errors});
         return;
      }

      const login = await api.post("/session/login", {
         username,
         password
      });

      if (login.status != "ok") {
         errors.submit = login.message;
         setErrors({...errors});
         return;
      }

      const session = await api.get("/session");

      if (session.status != "ok") {
         errors.submit = session.message;
         setErrors({...errors});
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
         <ModalSignInput label="username" value={username} onChange={setUsername} onBlur={onInputBlur} error={errors.username}/>
         <ModalSignInput label="password" value={password} onChange={setPassword} onBlur={onInputBlur} error={errors.password} password />
         <ModalSignInput label="password again" value={password2} onChange={setPassword2} onBlur={onInputBlur} error={errors.password2} password />
         <ModalSignInput label="e-mail address" value={email} onChange={setEmail} onBlur={onInputBlur} error={errors.email}/>
         <ModalSignButton label="SIGN IN" onClick={onSubmit} error={errors.submit}/>
         <span className="modal-sign-text">
            <span>Already have an account ?</span>
            <ModalSignOption label="SIGN IN" onClick={onClickSignIn}/>
         </span>
      </div>
   );
}

export default connect(
   null,
   { stateChangeUser, stateChangeModal }
)(ModalSignup);

