import React from "react";
import "./HelpCenter.css";
import NavBar from "../../NavBar/NavBar";
import SearchBar from "../../NavBar/SearchBar/SearchBar";
import ProfileLeft from "../components/ProfileLeft/ProfileLeft";
import HelpcenterMiddle from "./component/HelpcenterMiddle";

const HelpCenter = () => {
  return (
    <>
      <NavBar>
        <h2>Study Buddy.</h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" />
        <p>Chat Room</p>
        <p>Notes</p>
      </NavBar>
      <div className="helpcenter-container">
        <ProfileLeft />
        <HelpcenterMiddle />
      </div>
    </>
  );
};

export default HelpCenter;
