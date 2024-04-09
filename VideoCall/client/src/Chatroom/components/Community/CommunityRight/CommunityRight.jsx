import React, { useEffect, useState } from "react";
import "./CommunityRight.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  communityMessagesAtom,
  currentCommunityAtom,
} from "../../../store/communityStore";
import { authUserAtom } from "../../../store/authUser";
import ChatInput from "../../ChatInput/ChatInput";
import ChatHeader from "../../ChatHeader/ChatHeader";
import CommunityChat from "../CommunityChat/CommunityChat";
import CommunityDetails from "../CommunityDetails/CommunityDetails";

const CommunityRight = () => {
  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const authUser = useRecoilValue(authUserAtom);
  const setCommunityMessages = useSetRecoilState(communityMessagesAtom);
  const [detailsBtnClicked, setDetailsBtnClicked] = useState(false);

  console.log(currentCommunity._id);

  let currentCommunityMessage;

  async function fetchCurrentCommunityMessages() {
    try {
      const response = await fetch(
        `http://localhost:3000/chatroom/community/messages/${currentCommunity._id}`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      currentCommunityMessage = await response.json();
      console.log(currentCommunityMessage);
      setCommunityMessages(currentCommunityMessage);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchCurrentCommunityMessages();
  }, [currentCommunity, authUser]);

  return (
    <div className="community-right">
      <div
        className="selected-community"
        style={detailsBtnClicked ? { width: "73%" } : { width: "100%" }}
      >
        <ChatHeader
          from="community"
          setDetailsBtnClicked={setDetailsBtnClicked}
          detailsBtnClicked={detailsBtnClicked}
          current={currentCommunity}
        />
        <CommunityChat />
        <ChatInput open={detailsBtnClicked} />
      </div>

      <CommunityDetails
        open={detailsBtnClicked}
        setOpen={setDetailsBtnClicked}
      />
    </div>
  );
};

export default CommunityRight;
