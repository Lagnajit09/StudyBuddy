import React, { useEffect, useMemo, useState } from "react";
import "./CommunityRight.css";
import { useRecoilValue } from "recoil";
import {
  currentCommunityAtom,
} from "../../../../store/chatroomStore/communityStore";
import { authUserAtom } from "../../../../store/authAtom";
import CommunityInput from "../CommunityInput/CommunityInput";
import CommunityDetails from "../CommunityDetails/CommunityDetails";
import CommunityHeader from "../CommunityHeader/CommunityHeader";
import CommunityMsg from "../CommunityMsg/CommunityMsg";

const CommunityRight = () => {
  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const authUser = useRecoilValue(authUserAtom);
  const [detailsBtnClicked, setDetailsBtnClicked] = useState(false);

  const isAMember = useMemo(() => {
    const arr = currentCommunity.members.map(
      (member) => authUser.userId === member._id
    );
    return arr.includes(true);
  }, [currentCommunity]);

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
