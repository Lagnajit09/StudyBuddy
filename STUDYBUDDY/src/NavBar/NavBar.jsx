import React from "react";
import "./NavBar.css";
import { authUserAtom } from "../store/authAtom";
import { useRecoilValue } from "recoil";
import { Avatar } from "@mui/material";

const NavBar = (props) => {
  const authUser = useRecoilValue(authUserAtom);

  let navbarStyle = {};
  props.style === false
    ? null
    : (navbarStyle = {
        padding: "10px 25px",
        borderBottom: "2px solid rgba(217, 217, 217, 0.773)",
        webkitBoxShadow: "0px 1px 4px 1px rgba(0, 169, 255, 0.2)",
        mozBoxShadow: "0px 1px 4px 1px rgba(0, 169, 255, 0.2)",
        boxShadow: "0px 1px 4px 1px rgba(0, 169, 255, 0.2)",
        position: "relative",
        top: "0",
        zIndex: "2",
      });

  const hoverinHandler = () => {
    document.getElementsByClassName("hoverBorder")[0].style.transform =
      "translate(-45%)";
  };

  const hoveroutHandler = () => {
    document.getElementsByClassName("hoverBorder")[0].style.transform =
      "translate(45%)";
  };

  return (
    <div className="navbar" style={navbarStyle}>
      {props.children}

      {authUser.user ? (
        <div
          className="navbar-avatar"
          style={{ width: props.style === false ? "9.5%" : "5%" }}
        >
          <Avatar
            src={authUser.user.profile_pic}
            alt={authUser.user.firstname.toUpperCase()}
            style={{
              backgroundColor: authUser.user.profile_pic,
              height: "35px",
              width: "35px",
              fontWeight: "bold",
            }}
          />
        </div>
      ) : (
        <div className="buttons">
          <button
            id="login"
            onClick={props.toggleLoginModal}
            onMouseOver={hoverinHandler}
            onMouseOut={hoveroutHandler}
          >
            Login
          </button>

          <div className="hoverBorder"></div>
          <button id="signup" onClick={props.toggleSignupModal}>
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
