import React from "react";
import NavBar from "../../NavBar/NavBar";
import "./Settings.css";
import SearchBar from "../../NavBar/SearchBar/SearchBar";
import Avatar from "@mui/material/Avatar";
import ProfileLeft from "../components/ProfileLeft/ProfileLeft";
import SettingsMiddle from "./components/SettingsMiddle/SettingsMiddle";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar>
        <h2
          onClick={() => {
            navigate("/");
          }}
        >
          Study Buddy.
        </h2>
        <p
          onClick={() => {
            navigate("/courses");
          }}
        >
          Courses
        </p>
        <SearchBar className="searchWidth" />
        <p
          onClick={() => {
            navigate("/chatroom/community");
          }}
        >
          Chat Room
        </p>
        <p
          onClick={() => {
            navigate("/note");
          }}
        >
          Notes
        </p>
      </NavBar>
      <div className="settings-container">
        <ProfileLeft />
        <SettingsMiddle />
      </div>
    </>
  );
};

export default Settings;
