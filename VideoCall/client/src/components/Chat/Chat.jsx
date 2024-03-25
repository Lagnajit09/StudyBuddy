import React from "react";
import { useRecoilValue } from "recoil";
import { currentChatAtom } from "../../store/chatStore";
import ChatLeft from "./ChatLeft/ChatLeft";
import ChatRight from "./ChatRight/ChatRight";
import "./Chat.css";

const Chat = () => {
  const currentChat = useRecoilValue(currentChatAtom);
  return (
    <div className="chat-container">
      <ChatLeft />
      {currentChat.firstName ? <ChatRight /> : null}
    </div>
  );
};

export default Chat;
