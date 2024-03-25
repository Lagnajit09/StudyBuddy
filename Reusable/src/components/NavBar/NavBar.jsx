import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import "./NavBar.css";

const NavBar = (props) => {
  return <div className="navbar">{props.children}</div>;
};

export default NavBar;
