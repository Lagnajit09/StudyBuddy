import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./CommunityRight.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  communityMessagesAtom,
  currentCommunityAtom,
  joinedCommunitiesAtom,
  newCommunityMsgAtom,
} from "../../../../store/chatroomStore/communityStore";
import { authUserAtom } from "../../../../store/authAtom";
import CommunityInput from "../CommunityInput/CommunityInput";
import CommunityDetails from "../CommunityDetails/CommunityDetails";
import CommunityHeader from "../CommunityHeader/CommunityHeader";
import CommunityMsg from "../CommunityMsg/CommunityMsg";
import { BASE_URL } from "../../../../config";
import socket from "../../../../store/chatroomStore/socket";

const CommunityRight = () => {
  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const joinedCommunities = useRecoilValue(joinedCommunitiesAtom);
  const authUser = useRecoilValue(authUserAtom);
  const setCommunityMessages = useSetRecoilState(communityMessagesAtom);
  const setNewCommunityMessages = useSetRecoilState(newCommunityMsgAtom);
  const [detailsBtnClicked, setDetailsBtnClicked] = useState(false);

  useEffect(() => {
    const userId = authUser.userId;

    if (joinedCommunities) {
      socket.emit("userId", { userId, joinedCommunities });
    }
  }, [joinedCommunities]);

  const isAMember = useMemo(() => {
    const arr = currentCommunity.members.map(
      (member) => authUser.userId === member._id
    );
    return arr.includes(true);
  }, [currentCommunity]);

  let currentCommunityMessage;

  async function fetchCurrentCommunityMessages() {
    try {
      const response = await fetch(
        `${BASE_URL}/chatroom/community/messages/${authUser.userId}/${currentCommunity._id}`,
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      currentCommunityMessage = await response.json();
      setCommunityMessages(currentCommunityMessage);
      setNewCommunityMessages([]);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchCurrentCommunityMessages();
  }, [currentCommunity, authUser]);

  useEffect(() => {
    detailsBtnClicked && setDetailsBtnClicked(false);
  }, [currentCommunity]);

  return (
    <div className="community-right">
      <div
        className="selected-community"
        style={detailsBtnClicked ? { width: "73%" } : { width: "100%" }}
      >
        <CommunityHeader
          from="community"
          setDetailsBtnClicked={setDetailsBtnClicked}
          detailsBtnClicked={detailsBtnClicked}
          current={currentCommunity}
        />
        <CommunityMsg msg_height={isAMember ? "80%" : "90%"} />
        {isAMember && <CommunityInput open={detailsBtnClicked} />}
      </div>

      <CommunityDetails
        open={detailsBtnClicked}
        setOpen={setDetailsBtnClicked}
      />
    </div>
  );
};

export default CommunityRight;
