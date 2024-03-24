import React from "react";
import "./ChatLeft.css";
import { Avatar } from "@mui/material";
import { cyan } from "@mui/material/colors";
import community from "../../../assets/Group 55.svg";
import chat from "../../../assets/Group 56.svg";
import chatMiddle from "../../../assets/chat.svg";
import SearchBar from "../../NavBar/SearchBar/SearchBar";
import ChatUsers from "../../ChatUsers/ChatUsers";

const ChatLeft = () => {
  return (
    <div className="chatleft">
      <div className="chatleft-header">
        <div className="userDetials">
          <Avatar
            sx={{ bgcolor: cyan[500], width: "39px", height: "39px" }}
            alt="John Doe"
            src="/broken-image.jpg"
          />
          <h3>John Doe</h3>
        </div>
        <div className="navigateIcons">
          <img src={community} alt="community" />
          <img src={chat} alt="chat" />
        </div>
      </div>
      <div className="chatleft-middle">
        <SearchBar className="chatleftSearch" placeholder="Search" />
        <div className="middle-container">
          <span>Messages</span>
          <img src={chatMiddle} alt="" />
        </div>
      </div>
      <div className="chatleft-bottom" style={{ overflowY: "scroll" }}>
        {/* <AddCircleOutlineRoundedIcon className="no-chat" /> */}
        <ChatUsers />
      </div>
    </div>
  );
};

export default ChatLeft;
