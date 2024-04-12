import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./CommunityRight.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  communityMessagesAtom,
  currentCommunityAtom,
} from "../../../store/communityStore";
import { authUserAtom } from "../../../store/authUser";
import CommunityInput from "../CommunityInput/CommunityInput";
import CommunityDetails from "../CommunityDetails/CommunityDetails";
import JoinCommunity from "../JoinCommunity/JoinCommunity";
import CommunityHeader from "../CommunityHeader/CommunityHeader";
import CommunityMsg from "../CommunityMsg/CommunityMsg";

const CommunityRight = () => {
  const params = useParams();
  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const authUser = useRecoilValue(authUserAtom);
  const setCommunityMessages = useSetRecoilState(communityMessagesAtom);
  const [detailsBtnClicked, setDetailsBtnClicked] = useState(false);

  const isAMember = useMemo(() => {
    const arr = currentCommunity.members.map(
      (member) => authUser.id === member._id
    );
    return arr.includes(true);
  }, [currentCommunity]);

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
        <CommunityHeader
          from="community"
          setDetailsBtnClicked={setDetailsBtnClicked}
          detailsBtnClicked={detailsBtnClicked}
          current={currentCommunity}
        />
        <CommunityMsg />
        {isAMember ? (
          <CommunityInput open={detailsBtnClicked} />
        ) : (
          <JoinCommunity />
        )}
      </div>

      <CommunityDetails
        open={detailsBtnClicked}
        setOpen={setDetailsBtnClicked}
      />
    </div>
  );
};

export default CommunityRight;
