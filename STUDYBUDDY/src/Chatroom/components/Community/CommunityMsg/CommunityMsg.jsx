import React, { useEffect, useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../../../store/authAtom";
import {
  communityMessagesAtom,
  newCommunityMsgAtom,
  currentCommunityAtom,
} from "../../../../store/chatroomStore/communityStore";
import "./CommunityMsg.css";
import Message from "./Message/Message";
import { CleaningServices } from "@mui/icons-material";

const CommunityMsg = ({ msg_height }) => {
  const authUser = useRecoilValue(authUserAtom);
  const communityMessages = useRecoilValue(communityMessagesAtom);
  const newMessages = useRecoilValue(newCommunityMsgAtom);
  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const msgWrapper = useRef();

  const height = msgWrapper.current?.scrollHeight;

  let mergedMessages = [...communityMessages, ...newMessages];

  mergedMessages = mergedMessages.sort((a, b) => a.createdAt - b.createdAt);

  useEffect(() => {
    msgWrapper.current?.scroll(0, height);
  }, [mergedMessages, msgWrapper.current?.scrollHeight]);

  const mergedArray = mergedMessages.map((message) => {
    const senderDetails = currentCommunity.members.find((member) => {
      return member?._id === message?.sender;
    });
    console.log(senderDetails);
    return {
      message: message?.content,
      sender: senderDetails,
      adminMsg: message?.adminMsg || false,
      createdAt: message?.createdAt,
    };
  });

  console.log(mergedMessages);
  console.log(currentCommunity);
  console.log(mergedArray);

  return (
    <div
      ref={msgWrapper}
      className="community-message"
      style={{ height: msg_height }}
    >
      <div className="community-message-container">
        {mergedArray?.map((message, index) => {
          if (message?.sender?._id === authUser?.userId) {
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
          } else if (message?.adminMsg === true) {
            return (
              <Message
                key={index}
                message={message}
                styleMessage={{
                  maxWidth: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                styleMsgL={{ alignItems: "center" }}
                msgText={{
                  backgroundColor: "rgba(211, 211, 211, 0.2)",
                  color: "rgba(0,0,0,0.75)",
                }}
                authUser={false}
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
