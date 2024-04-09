import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../../store/authUser";
import {
  communityMessagesAtom,
  currentCommunityAtom,
  newCommunityMsgAtom,
} from "../../../store/communityStore";
import "./CommunityChat.css";

const CommunityChat = () => {
  const authUser = useRecoilValue(authUserAtom);
  const communityMessages = useRecoilValue(communityMessagesAtom);
  const newMessages = useRecoilValue(newCommunityMsgAtom);
  const currentCommunity = useRecoilValue(currentCommunityAtom);

  const msgWrapper = useRef();

  const height = msgWrapper.current?.scrollHeight;

  //   let mergedMessages = [...communityMessages, ...newMessages];

  useEffect(() => {
    msgWrapper.current?.scroll(0, height);
  }, [msgWrapper.current?.scrollHeight]);

  return (
    <div ref={msgWrapper} className="chat-message">
      <div className="chat-message-container">
        {/* {mergedMessages?.map((message, index) => {
          if (
            message?.sender === authUser?.id &&
            message?.community === currentCommunity._id
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
          } else if (message?.sender === currentCommunity?._id) {
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
        })} */}
      </div>
    </div>
  );
};

export default CommunityChat;
