import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../../../store/authAtom";
import {
  chatMessageAtom,
  newMessageAtom,
  currentChatAtom,
} from "../../../../store/chatroomStore/chatStore";
import "./ChatMessage.css";
import Message from "./Message/Message";

const ChatMessage = () => {
  const authUser = useRecoilValue(authUserAtom);
  const chatMessages = useRecoilValue(chatMessageAtom);
  const newMessages = useRecoilValue(newMessageAtom);
  const currentChat = useRecoilValue(currentChatAtom);
  const msgWrapper = useRef();

  const height = msgWrapper.current?.scrollHeight;

  let mergedMessages = [...chatMessages, ...newMessages];

  useEffect(() => {
    msgWrapper.current?.scroll(0, height);
  }, [mergedMessages, msgWrapper.current?.scrollHeight]);

  return (
    <div ref={msgWrapper} className="chat-message">
      <div className="chat-message-container">
        {mergedMessages?.map((message, index) => {
          if (
            message?.senderId === authUser?.userId &&
            message?.receiverId === currentChat.id
          ) {
            return (
              <Message
                key={index}
                message={message}
                styleMessage={{ flexDirection: "row-reverse", float: "right" }}
                styleMsgL={{ alignItems: "flex-end" }}
                msgText={{ backgroundColor: "#00A9FF", color: "white" }}
                showIcon={false}
              />
            );
          } else if (message?.senderId === currentChat?.id) {
            return (
              <Message
                key={index}
                message={message}
                styleMessage={{ flexDirection: "row", float: "left" }}
                styleMsgL={{ alignItems: "flex-start" }}
                msgText={{ backgroundColor: "white", color: "black" }}
                showIcon={true}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ChatMessage;
