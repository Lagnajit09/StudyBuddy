import React from "react";
import "./EnterChat.css";
import { useNavigate } from "react-router-dom";
import enterChat from "../../../../assets/chatroom_imgs/enterChat.svg";
import { PiArrowRight, PiUsersThree } from "react-icons/pi";

const EnterChat = () => {
  const navigate = useNavigate();
  return (
    <div className="enter-chat">
      <img src={enterChat} alt="Chat-img" />
      <h1>Welcome to Private Chat</h1>
      <p className="instruction">
        To start a new chat, go to the community tab, and message any member
        from a community.
      </p>
      <div
        className="go-to-community"
        onClick={() => {
          navigate("/chatroom/community");
        }}
      >
        <div className="community-logo">
          <PiUsersThree
            style={{
              color: "rgba(255,255,255,0.8)",
            }}
          />
        </div>

        <span>Go to community</span>
        <PiArrowRight style={{ marginLeft: "10px" }} />
      </div>
      <p className="encrypted">End-to-end encrypted.</p>
    </div>
  );
};

export default EnterChat;
