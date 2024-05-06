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
  newCommunityMsgAtom,
} from "../../../../store/chatroomStore/communityStore";
import { authUserAtom } from "../../../../store/authAtom";
import { BASE_URL } from "../../../../config";
import socket from "../../../../store/chatroomStore/socket";

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
  const [newMessage, setNewMessage] = useRecoilState(newCommunityMsgAtom);

  useEffect(() => {
    if (member.firstname) {
      setDetailsBtnClicked(true);
    }
  }, [member]);

  console.log(currentCommunity);

  useEffect(() => {
    const updateCommunity = ({ user, communityId, action }) => {
      const updatedCommunityIndex = joinedCommunities.findIndex((community) => {
        return community._id === communityId;
      });

      if (updatedCommunityIndex === -1) {
        // Community not found
        return;
      }

      const updatedCommunity = { ...joinedCommunities[updatedCommunityIndex] };
      let adminMessage = {};

      if (action === "join") {
        updatedCommunity.members = [...updatedCommunity.members, user];
        adminMessage = {
          userId: authUser.userId,
          content: `${user.firstname} ${user.lastname}, Welcome to ${updatedCommunity.name}!`,
          sender: "6638c9ad872de350a4481e17",
          community: updatedCommunity._id,
          adminMsg: true,
          createdAt: Date.now(),
        };
      } else if (action === "leave") {
        updatedCommunity.members = updatedCommunity.members.filter(
          (member) => member._id !== user._id
        );
        adminMessage = {
          userId: authUser.userId,
          content: `${user.firstname} ${user.lastname} left!`,
          sender: "6638c9ad872de350a4481e17",
          community: updatedCommunity._id,
          adminMsg: true,
          createdAt: Date.now(),
        };
      }

      // Replace the updated community in the array
      const updatedCommunities = [...joinedCommunities];
      updatedCommunities[updatedCommunityIndex] = updatedCommunity;

      setJoinedCommunities(updatedCommunities);

      if (currentCommunity._id === communityId) {
        setCurrentCommunity(updatedCommunity);
      }

      postAdminMessage(adminMessage);
    };

    socket.on("communityUpdate", updateCommunity);

    return () => {
      socket.off("communityUpdate", updateCommunity);
    };
  }, [joinedCommunities, currentCommunity]);

  const postAdminMessage = async (data) => {
    const apiUrl = `${BASE_URL}/chatroom/community/send-message`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return;
    }

    const json = await response.json();
    console.log(json);
  };

  const isAMember = useMemo(() => {
    const arr = currentCommunity.members.map(
      (member) => authUser.userId === member._id
    );
    return arr.includes(true);
  }, [currentCommunity]);

  const joinCommunity = () => {
    updateDbJoin();

    const newMember = {
      _id: authUser.userId,
      firstname: authUser.user.firstname,
      lastname: authUser.user.lastname,
      email: authUser.user.email,
      profile_pic: authUser.user.profile_pic,
      bio: authUser.user.bio,
    };

    socket.emit("joinCommunity", {
      user: newMember,
      communityId: currentCommunity._id,
    });
    socket.emit("userJoinedCommunity", {
      user: newMember,
      communityId: currentCommunity._id,
    });

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
