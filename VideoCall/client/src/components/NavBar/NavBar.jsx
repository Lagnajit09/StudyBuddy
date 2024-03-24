import React from "react";
import "./NavBar.css";

const NavBar = (props) => {
  return <div className="navbar">{props.children}</div>;
};

export default NavBar;
