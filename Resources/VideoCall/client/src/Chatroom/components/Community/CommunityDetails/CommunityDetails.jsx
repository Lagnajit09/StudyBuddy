import React, { memo, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityDetails.css";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import CommunityMembers from "../../../../assets/CommunityMembers.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  communityMemberDetailsAtom,
  currentCommunityAtom,
  joinedCommunitiesAtom,
} from "../../../store/communityStore";
import { authUserAtom } from "../../../store/authUser";
import { FaArrowLeft } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiTrash } from "react-icons/fi";

const CommunityDetails = (props) => {
  const navigate = useNavigate();
  const [currentCommunity, setCurrentCommunity] =
    useRecoilState(currentCommunityAtom);
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(
    joinedCommunitiesAtom
  );
  const authUser = useRecoilValue(authUserAtom);
  const [cMember, setCMember] = useRecoilState(communityMemberDetailsAtom);
  const [showMembers, setShowMembers] = useState(false);
  const [copiedVisible, setCopiedVisible] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  const style = {
    height: "0%",
    padding: "0 15px",
    border: "none",
  };

  useEffect(() => {
    if (cMember.firstName) {
      setShowMembers(true);
      setShowDeleteMenu(false);
    }
  }, [cMember]);

  const inviteLink = useMemo(() => {
    return `http://localhost:5173/chatroom/community/${currentCommunity._id}`;
  }, [currentCommunity]);

  const handleCopy = () => {
    setCopiedVisible(true);
    setTimeout(() => {
      setCopiedVisible(false);
    }, 300);
  };

  const handleLeaveCommunity = async () => {
    //update database
    const userLeft = await updateDbLeave();
    const userIndex = currentCommunity.members.findIndex(
      (member) => member._id === authUser.id
    );
    const communityIndex = joinedCommunities.findIndex(
      (community) => community._id === currentCommunity._id
    );

    if (userIndex !== -1) {
      const updatedMembers = [
        ...currentCommunity.members.slice(0, userIndex),
        ...currentCommunity.members.slice(userIndex + 1),
      ];
      setCurrentCommunity((prevCommunity) => ({
        ...prevCommunity,
        members: updatedMembers,
      }));
    }

    if (communityIndex !== -1) {
      const updatedCommunities = [
        ...joinedCommunities.slice(0, communityIndex),
        ...joinedCommunities.slice(communityIndex + 1),
      ];
      setJoinedCommunities(updatedCommunities);
    }
    setShowDeleteMenu(!showDeleteMenu);
    document.querySelector(".leave-community").style.display = "none";
  };

  const updateDbLeave = async () => {
    const info = {
      user: authUser.id,
      community: currentCommunity._id,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/chatroom/community/leave",
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
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="community-details"
      style={props.open ? { right: "0" } : null}
    >
      <div className="communityD-header">
        <h3>Details</h3>
        <button
          className="community-details-button"
          onClick={() => {
            props.setOpen(false);
          }}
        >
          <CloseIcon style={{ width: "20px", height: "20px" }} />
        </button>
      </div>
      <div className="communityD-name">
        {cMember.firstName && (
          <FaArrowLeft
            className="community-backIcon"
            onClick={() => {
              setCMember({});
            }}
          />
        )}
        <Avatar
          src={cMember.firstName || currentCommunity.name}
          alt={cMember.firstName || currentCommunity.name}
          sx={{
            width: "75px",
            height: "75px",
            backgroundColor: cMember.profile_pic || currentCommunity.image,
            fontSize: "40px",
          }}
        />
        <h3>{`${
          cMember.firstName
            ? cMember.firstName + " " + cMember.lastName
            : currentCommunity.name
        }`}</h3>
        {cMember.firstName && (
          <IoChatbubbleEllipsesOutline
            style={{
              fontSize: "25px",
              padding: "4px",
              color: "rgb(0,0,0,0.5)",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/chatroom/chat/${cMember._id}`, {
                state: {
                  chatUser: {
                    id: cMember._id,
                    firstName: cMember.firstName,
                    lastName: cMember.lastName,
                    email: cMember.email,
                    profile_pic: cMember.profile_pic,
                  },
                  lastMessage: "",
                  lastMsgTime: "",
                },
              });
            }}
          />
        )}
      </div>

      <div className="communityD-about" style={showMembers ? style : {}}>
        <h4>Description</h4>
        <p>{currentCommunity.description}</p>
      </div>
      <div className="community-link" style={showMembers ? style : {}}>
        <h4>Invite link</h4>
        <CopyToClipboard text={inviteLink}>
          <span className="link" onClick={handleCopy}>
            {inviteLink.slice(0, 15) + "..."}
          </span>
        </CopyToClipboard>
        {copiedVisible && <span className="copied">Copied!</span>}
      </div>

      {!cMember.firstName && (
        <div className="communityD-members">
          <div
            className="members-header"
            onClick={() => {
              setShowMembers(!showMembers);
            }}
          >
            <h4>Members</h4>
            <div className="members-count">
              <img src={CommunityMembers} alt="CommunityMembers" />
              <span>{"+" + currentCommunity.members?.length}</span>
            </div>
          </div>
          {showMembers && (
            <div className="communityD-memberlist">
              {currentCommunity.members?.map((member, index) => {
                return (
                  <div
                    key={index}
                    className="com-member"
                    onClick={() => {
                      setCMember(member);
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: member.profile_pic,
                        width: "25px",
                        height: "25px",
                        fontSize: "15px",
                      }}
                      src={member.profile_pic}
                      alt={member.firstName}
                    />
                    <h4>{`${member.firstName} ${member.lastName}`}</h4>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div
        className="leave-community"
        style={{ display: showMembers || cMember.firstName ? "none" : "flex" }}
      >
        {!showDeleteMenu && (
          <div className="dlt-btn" onClick={() => setShowDeleteMenu(true)}>
            <h4>Leave Community</h4>
            <FiTrash style={{ color: "red" }} />
          </div>
        )}
        {showDeleteMenu && (
          <div className="leave-menu">
            <h4>Are you sure?</h4>
            <div className="leave-menu-btn">
              <button className="leave" onClick={handleLeaveCommunity}>
                Leave
              </button>
              <button onClick={() => setShowDeleteMenu(!showDeleteMenu)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {cMember.firstName && (
        <div className="communityD-about">
          <h4>About</h4>
          <p>Hello World!</p>
        </div>
      )}
    </div>
  );
};

export default CommunityDetails;
