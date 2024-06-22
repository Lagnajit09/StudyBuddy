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
} from "../../../../store/chatroomStore/communityStore";
import { authUserAtom } from "../../../../store/authAtom";
import { BASE_URL } from "../../../../config";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";

const CommunityHeader = ({
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
    if (member.firstname) {
      setDetailsBtnClicked(true);
    }
  }, [member]);


  const isAMember = useMemo(() => {
    const arr = currentCommunity.members.map(
      (member) => authUser.userId === member._id
    );
    return arr.includes(true);
  }, [currentCommunity]);

  const joinCommunity = async () => {
    updateDbJoin();

    const data = {
      userId: '6638c9ad872de350a4481e17',
      sender: '6638c9ad872de350a4481e17',
      community: currentCommunity._id,
      content: `${authUser.user.firstname} ${authUser.user.lastname}, Welcome to the community!`,
      createdAt: Date.now(),
      adminMsg: true
    };

    try {
      await addDoc(collection(db, 'communityMessages'), data);
      console.log("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    const newMember = {
      _id: authUser.userId,
      firstname: authUser.user.firstname,
      lastname: authUser.user.lastname,
      email: authUser.user.email,
      profile_pic: authUser.user.profile_pic,
      bio: authUser.user.bio,
    };

    setCurrentCommunity((prev) => {
      return {
        ...prev,
        members: [newMember, ...prev.members],
      };
    });

    setJoinedCommunities((prev) => [currentCommunity, ...prev]);
    document.querySelector(".leave-community").style.display = "flex";
  };

  const updateDbJoin = async () => {
    const info = {
      userId: authUser.userId,
      community: currentCommunity._id,
    };
    try {
      const response = await fetch(`${BASE_URL}/chatroom/community/join`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify(info),
      });
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
          alt={current.name || current.firstname}
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
