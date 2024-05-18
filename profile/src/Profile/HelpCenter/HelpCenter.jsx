import React from "react";
import './HelpCenter.css';
import NavBar from "../../NavBar/NavBar";
import SearchBar from "../../NavBar/SearchBar/SearchBar";
import Avatar from "@mui/material/Avatar";
import ProfileLeft from "../components/ProfileLeft/ProfileLeft";
import { RecoilRoot } from "recoil";
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
        <Avatar
          src={"username"}
          alt={""}
          sx={{ bgcolor: "#00A9FF", width: "30px", height: "30px" }}
        />
      </NavBar>
      <div className="helpcenter-container">
        <RecoilRoot>
          <ProfileLeft />
          <HelpcenterMiddle/>
        </RecoilRoot>
        
      </div>
    </>
  );
};

export default HelpCenter;
