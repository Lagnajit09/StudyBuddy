import React from "react";
import ChatLeft from "./ChatLeft/ChatLeft";
import ChatRight from "./ChatRight/ChatRight";
import "./Chat.css";

const Chat = () => {
  return (
    <div className="chat-container">
      <ChatLeft />
      <ChatRight />
    </div>
  );
};

export default Chat;
