import React from "react";
import { useRecoilValue } from "recoil";
import { currentChatAtom } from "../../store/chatStore";
import ChatRoomLeft from "../ChatRoomLeft/ChatRoomLeft";
import ChatRight from "./ChatRight/ChatRight";
import "./Chat.css";
import EnterChat from "./EnterChat/EnterChat";

const Chat = () => {
  const currentChat = useRecoilValue(currentChatAtom);
  return (
    <div className="chat-container">
      <ChatRoomLeft for="chat" />
      {currentChat.firstName ? <ChatRight /> : <EnterChat />}
    </div>
  );
};

export default Chat;
