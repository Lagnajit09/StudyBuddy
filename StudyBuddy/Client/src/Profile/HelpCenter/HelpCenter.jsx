import React from "react";
import "./HelpCenter.css";
import NavBar from "../../NavBar/NavBar";
import SearchBar from "../../NavBar/SearchBar/SearchBar";
import ProfileLeft from "../components/ProfileLeft/ProfileLeft";
import HelpcenterMiddle from "./component/HelpcenterMiddle";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
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
      <div className="helpcenter-container">
        <ProfileLeft />
        <HelpcenterMiddle />
      </div>
    </>
  );
};

export default HelpCenter;
