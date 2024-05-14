import "./SignupModal.css";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authUserAtom } from "../store/authAtom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import {
  emailHandler,
  passwordHandler,
  confirmPasswordHandler,
  nameHandler,
} from "../userAuthHandlers/validation";
import {
  googleAuthenticate,
  signupHandler,
} from "../userAuthHandlers/authHandler";

const SignupModal = (props) => {
  const [authUser, setAuthUser] = useRecoilState(authUserAtom);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [cPasswordValid, setCpasswordValid] = useState(false);
  const [fNameValid, setFnameValid] = useState(false);
  const [lNameValid, setLnameValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const loginClickHandler = (event) => {
    props.setLoginModal(true);
    props.setSignupModal(false);
  };

  useEffect(() => {
    setFormIsValid(
      emailValid && fNameValid && lNameValid && passwordValid && cPasswordValid
    );
  }, [emailValid, fNameValid, lNameValid, passwordValid, cPasswordValid]);

  return (
    <div className="Signup-Modal-container">
      <div className="signup">
        <span id="signup-span">Create Account</span>
        <div className="signup-socials">
          <button className="social-btn">
            <FaFacebookF
              style={{
                backgroundColor: "transparent",
                fontSize: "20px",
                marginTop: "2px",
              }}
            />
          </button>
          <button className="social-btn" onClick={googleAuthenticate}>
            <FaGoogle
              style={{
                backgroundColor: "transparent",
                fontSize: "20px",
                marginTop: "2px",
              }}
            />
          </button>
          <button className="social-btn">
            <FaLinkedinIn
              style={{
                backgroundColor: "transparent",
                fontSize: "20px",
                marginTop: "2px",
              }}
            />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            signupHandler(
              e,
              formIsValid,
              enteredEmail,
              enteredFirstName,
              enteredLastName,
              enteredPassword,
              setAuthUser,
              props.toggleSignupModal
            );
          }}
        >
          <div className="signup-form-div">
            <input
              type="text"
              className="firstname"
              placeholder="First name"
              required
              onBlur={() => {
                nameHandler(
                  enteredFirstName,
                  "firstname",
                  "fname-invalid",
                  "input-error",
                  setFnameValid
                );
              }}
              onChange={(e) => {
                setEnteredFirstName(e.target.value);
              }}
            />
            <span className="fname-invalid">First name is required.</span>
            <input
              type="text"
              className="lastname"
              placeholder="Last name"
              required
              onBlur={() => {
                nameHandler(
                  enteredLastName,
                  "lastname",
                  "lname-invalid",
                  "input-error",
                  setLnameValid,
                  "s-email-invalid"
                );
              }}
              onChange={(e) => {
                setEnteredLastName(e.target.value);
              }}
            />
            <span className="lname-invalid">Last name is required.</span>
            <input
              type="text"
              className="s-email-input"
              placeholder="Email"
              onBlur={() => {
                emailHandler(
                  enteredEmail,
                  "s-email-input",
                  "s-email-invalid",
                  "input-error",
                  setEmailValid
                );
              }}
              onChange={(e) => {
                setEnteredEmail(e.target.value);
              }}
              required
            />
            <span className="s-email-invalid">
              Email must contain a '@' and a '.'
            </span>
            <input
              type="password"
              className="cpwd-input"
              placeholder="Password"
              onBlur={() => {
                passwordHandler(
                  enteredPassword,
                  "cpwd-input",
                  "s-pass-invalid",
                  "input-error",
                  setPasswordValid
                );
              }}
              onChange={(e) => {
                setEnteredPassword(e.target.value);
              }}
              required
            />
            <span className="s-pass-invalid">
              Password should have atleast 6 characters.
            </span>
            <input
              type="password"
              className="cpwd-input"
              placeholder="Confirm Password"
              onBlur={() => {
                confirmPasswordHandler(
                  enteredPassword,
                  enteredConfirmPassword,
                  "cpwd-input",
                  "cpass-invalid",
                  "input-error",
                  setCpasswordValid
                );
              }}
              onChange={(e) => {
                setEnteredConfirmPassword(e.target.value);
              }}
              required
            />
            <span className="cpass-invalid">
              Confirm password should be same as Password.
            </span>
          </div>
          <button type="submit" className="signup-btn">
            Signup
          </button>
        </form>
      </div>
      <div className="to-login">
        <div className="welcome-1">
          <span>Welcome To</span>
          <span>Study Buddy!</span>
        </div>

        <span id="welcome-2">Already have an account?</span>
        <button type="submit" className="login-btn" onClick={loginClickHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
