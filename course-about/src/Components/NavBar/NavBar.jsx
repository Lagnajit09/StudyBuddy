import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import "./NavBar.css";

const NavBar = (props) => {
  let navbarStyle = {};
  props.style === false
    ? null
    : (navbarStyle = {
        borderBottom: "2px solid rgba(217, 217, 217, 0.773)",
        webkitBoxShadow: "0px 1px 4px 1px rgba(0, 169, 255, 0.2)",
        mozBoxShadow: "0px 1px 4px 1px rgba(0, 169, 255, 0.2)",
        boxShadow: "0px 1px 4px 1px rgba(0, 169, 255, 0.2)",
        position: "relative",
        top: "0",
        zIndex: "2",
      });

  return (
    <div className="navbar" style={navbarStyle}>
      {props.children}
    </div>
  );
};

export default NavBar;


