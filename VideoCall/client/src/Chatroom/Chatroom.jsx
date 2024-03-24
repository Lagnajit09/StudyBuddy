import React from "react";
import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/NavBar/SearchBar/SearchBar";
import Chat from "../components/Chat/Chat";
import "./Chatroom.css";
import { Avatar } from "@mui/material";
import { cyan } from "@mui/material/colors";

const Chatroom = () => {
  return (
    <div className="chatroom">
      <NavBar>
        <h2>Study Buddy.</h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" placeholder="Search Chat Room" />
        <p>Chat Room</p>
        <p>Notes</p>
        <Avatar
          src="abc.com"
          alt="John Doe"
          sx={{ bgcolor: cyan[500], width: "30px", height: "30px" }}
        />
      </NavBar>
      <Chat />
    </div>
  );
};

export default Chatroom;
