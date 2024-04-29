import React, { useState } from "react";
import "./AuthModal.css";
import LoginModal from "../Login/LoginModal";
import SignupModal from "../Signup/SignupModal";

const AuthModal = (props) => {
  return (
    <>
      {props.loginModal[0] && (
        <div className="modal">
          <div onClick={props.toggleLoginModal} className="overlay"></div>
          <div className="modal_container">
            <LoginModal
              setSignupModal={props.signupModal[1]}
              setLoginModal={props.loginModal[1]}
              toggleLoginModal={props.toggleLoginModal}
            />
          </div>
        </div>
      )}

      {props.signupModal[0] && (
        <div className="modal">
          <div onClick={props.toggleSignupModal} className="overlay"></div>
          <div className="modal_container">
            <SignupModal
              setSignupModal={props.signupModal[1]}
              setLoginModal={props.loginModal[1]}
              toggleSignupModal={props.toggleSignupModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
