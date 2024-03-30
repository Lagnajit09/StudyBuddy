import React from "react";
import "./ChatLeft.css";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../../store/authUser";
import { Avatar } from "@mui/material";
import { cyan } from "@mui/material/colors";
import community from "../../../assets/Group 55.svg";
import chat from "../../../assets/Group 56.svg";
import chatMiddle from "../../../assets/chat.svg";
import SearchBar from "../../NavBar/SearchBar/SearchBar";
import ChatUsers from "../../ChatUsers/ChatUsers";

const ChatLeft = () => {
  const authUser = useRecoilValue(authUserAtom);
  return (
    <div className="chatleft">
      <div className="chatleft-header">
        <div className="userDetials">
          <Avatar
            sx={{
              bgcolor: authUser.profile_pic,
              width: "39px",
              height: "39px",
            }}
            alt={authUser.firstName}
            src="/broken-image.jpg"
          />
          <h3>{`${authUser.firstName}`}</h3>
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
