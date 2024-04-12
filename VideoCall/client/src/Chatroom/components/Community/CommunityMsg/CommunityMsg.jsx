import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../../store/authUser";
import {
  communityMessagesAtom,
  newCommunityMsgAtom,
  currentCommunityAtom,
} from "../../../store/communityStore";
import "./CommunityMsg.css";
import Message from "./Message/Message";

const CommunityMsg = () => {
  const authUser = useRecoilValue(authUserAtom);
  const communityMessages = useRecoilValue(communityMessagesAtom);
  const newMessages = useRecoilValue(newCommunityMsgAtom);
  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const msgWrapper = useRef();

  const height = msgWrapper.current?.scrollHeight;

  let mergedMessages = [...communityMessages, ...newMessages];
  console.log(newMessages);
  console.log(mergedMessages);

  useEffect(() => {
    msgWrapper.current?.scroll(0, height);
  }, [mergedMessages, msgWrapper.current?.scrollHeight]);

  const mergedArray = mergedMessages.map((message) => {
    const senderDetails = currentCommunity.members.find((member) => {
      return member?._id === message?.sender;
    });
    return {
      message: message?.content,
      sender: senderDetails,
      createdAt: message?.createdAt,
    };
  });

  return (
    <div ref={msgWrapper} className="community-message">
      <div className="community-message-container">
        {mergedArray?.map((message, index) => {
          if (message?.sender?._id === authUser?.id) {
            return (
              <Message
                key={index}
                message={message}
                styleMessage={{
                  flexDirection: "row-reverse",
                  float: "right",
                }}
                styleMsgL={{ alignItems: "flex-end" }}
                msgText={{
                  backgroundColor: "#00A9FF",
                  color: "white",
                  marginRight: "20px",
                }}
                profile={{
                  width: "18px",
                  height: "18px",
                  fontSize: "11px",
                  position: "absolute",
                }}
                authUser={true}
              />
            );
          } else {
            return (
              <Message
                key={index}
                message={message}
                styleMessage={{ flexDirection: "row", float: "left" }}
                styleMsgL={{ alignItems: "flex-start" }}
                msgText={{ backgroundColor: "white", color: "black" }}
                authUser={false}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default CommunityMsg;
