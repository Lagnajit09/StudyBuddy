import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../../store/authUser";
import { chatMessageAtom } from "../../../store/chatStore";
import "./ChatMessage.css";
import Message from "./Message/Message";

const ChatMessage = () => {
  const authUser = useRecoilValue(authUserAtom);
  const chatMessages = useRecoilValue(chatMessageAtom);

  const msgWrapper = useRef();

  const height = msgWrapper.current?.scrollHeight;

  useEffect(() => {
    msgWrapper.current?.scroll(0, height);
  }, [chatMessages, msgWrapper.current?.scrollHeight]);

  return (
    <div ref={msgWrapper} className="chat-message">
      <div className="chat-message-container">
        {chatMessages?.map((message, index) =>
          message?.senderId === authUser?.id ? (
            <Message
              key={index}
              message={message}
              styleMessage={{ flexDirection: "row-reverse", float: "right" }}
              styleMsgL={{ alignItems: "flex-end" }}
              msgText={{ backgroundColor: "#00A9FF", color: "white" }}
              showIcon={false}
            />
          ) : (
            <Message
              key={index}
              message={message}
              styleMessage={{ flexDirection: "row", float: "left" }}
              styleMsgL={{ alignItems: "flex-start" }}
              msgText={{ backgroundColor: "white", color: "black" }}
              showIcon={true}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
