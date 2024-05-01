import React from "react";
import NavBar from "../../NavBar/NavBar";
import "./Settings.css";
import SearchBar from "../../NavBar/SearchBar/SearchBar";
import Avatar from "@mui/material/Avatar";
import ProfileLeft from "../components/ProfileLeft/ProfileLeft";
import SettingsMiddle from "./components/SettingsMiddle/SettingsMiddle";

const Settings = () => {
  return (
    <>
      <NavBar>
        <h2>Study Buddy.</h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" />
        <p>Chat Room</p>
        <p>Notes</p>
      </NavBar>
      <div className="settings-container">
        <ProfileLeft />
        <SettingsMiddle />
      </div>
    </>
  );
};

export default Settings;
