import React, { useEffect, useMemo } from "react";
import "./CommunityHeader.css";
import Search from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  communityMemberDetailsAtom,
  currentCommunityAtom,
  joinedCommunitiesAtom,
} from "../../../store/communityStore";
import { authUserAtom } from "../../../store/authUser";

const CommunityHeader = ({
  from,
  setDetailsBtnClicked,
  current,
  detailsBtnClicked,
}) => {
  const [currentCommunity, setCurrentCommunity] =
    useRecoilState(currentCommunityAtom);
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(
    joinedCommunitiesAtom
  );
  const authUser = useRecoilValue(authUserAtom);
  const [member, setMember] = useRecoilState(communityMemberDetailsAtom);

  useEffect(() => {
    if (member.firstName) {
      setDetailsBtnClicked(true);
    }
  }, [member]);

  const isAMember = useMemo(() => {
    const arr = currentCommunity.members.map(
      (member) => authUser.id === member._id
    );
    return arr.includes(true);
  }, [currentCommunity]);

  const joinCommunity = () => {
    updateDbJoin();
    setCurrentCommunity((prev) => {
      return {
        ...prev,
        members: [
          {
            _id: authUser.id,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            email: authUser.email,
            profile_pic: authUser.profile_pic,
          },
          ...prev.members,
        ],
      };
    });

    setJoinedCommunities((prev) => [currentCommunity, ...prev]);
    document.querySelector(".leave-community").style.display = "flex";
  };

  const updateDbJoin = async () => {
    const info = {
      user: authUser.id,
      community: currentCommunity._id,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/chatroom/community/join",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chat-header">
      <div className="header-left">
        <Avatar
          sx={{
            bgcolor: current.image || current.profile_pic,
            width: "39px",
            height: "39px",
          }}
          alt={current.name || current.firstName}
          src="/broken-image.jpg"
        />
        <h3
          onClick={() => {
            setDetailsBtnClicked(!detailsBtnClicked);
          }}
        >{`${current.name}`}</h3>
      </div>
      <div className="header-right">
        {!isAMember && (
          <button className="join-community" onClick={joinCommunity}>
            Join
          </button>
        )}
        <span>
          <Search />
        </span>
        <span
          onClick={() => {
            setDetailsBtnClicked(!detailsBtnClicked);
            setMember({});
          }}
        >
          <MoreVertIcon />
        </span>
      </div>
    </div>
  );
};

export default CommunityHeader;
