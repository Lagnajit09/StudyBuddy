import React from "react";
import "./NavBar.css";
import { authUserAtom } from "../store/authAtom";
import { useRecoilValue } from "recoil";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const authUser = useRecoilValue(authUserAtom);
  const navigate = useNavigate();

  let navbarStyle = {};
  props.style === false
    ? null
    : (navbarStyle = {
        backgroundColor: "white",
        padding: "10px 25px",
        borderBottom: "2px solid rgba(217, 217, 217, 0.773)",
        WebkitBoxShadow: "0px 1px 4px 1px rgba(0, 169, 255, 0.2)",
        MozBoxShadow: "0px 1px 4px 1px rgba(0, 169, 255, 0.2)",
        boxShadow: "0px 1px 4px 1px rgba(0, 169, 255, 0.2)",
        position: "relative",
        top: "0",
        zIndex: "50",
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
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/profile");
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
