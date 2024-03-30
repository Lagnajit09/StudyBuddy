import React, { useState } from "react";
import "./ChatRight.css";
import { useRecoilValue } from "recoil";
import { currentChatAtom } from "../../../store/chatStore";
import Search from "@mui/icons-material/Search";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

import ChatInput from "../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatUserDetails from "../ChatUserDetails/ChatUserDetails";

const ChatRight = () => {
  const currentChat = useRecoilValue(currentChatAtom);
  const [detailsBtnClicked, setDetailsBtnClicked] = useState(false);
  return (
    <div className="chatright">
      <div
        className="chat-user"
        style={detailsBtnClicked ? { width: "73%" } : { width: "100%" }}
      >
        <div className="chat-header">
          <div className="header-left">
            <Avatar
              sx={{
                bgcolor: currentChat.profile_pic,
                width: "39px",
                height: "39px",
              }}
              alt={currentChat.firstName}
              src="/broken-image.jpg"
            />
            <h3>{`${currentChat.firstName} ${currentChat.lastName}`}</h3>
          </div>
          <div className="header-right">
            <span>
              <PhoneOutlinedIcon />
            </span>
            <span>
              <VideocamOutlinedIcon />
            </span>
            <span>
              <Search />
            </span>
            <span
              onClick={() => {
                setDetailsBtnClicked(!detailsBtnClicked);
              }}
            >
              <MoreVertIcon />
            </span>
          </div>
        </div>
        <ChatMessage />
        <ChatInput open={detailsBtnClicked} />
      </div>
      <ChatUserDetails
        open={detailsBtnClicked}
        setOpen={setDetailsBtnClicked}
      />
    </div>
  );
};

export default ChatRight;
