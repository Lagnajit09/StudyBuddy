import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityDetails.css";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import CommunityMembers from "../../../../assets/CommunityMembers.svg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentCommunityAtom } from "../../../store/communityStore";
import { FaArrowLeft } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { currentChatAtom } from "../../../store/chatStore";

const CommunityDetails = (props) => {
  const navigate = useNavigate();
  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const setCurrentChat = useSetRecoilState(currentChatAtom);
  const [showMembers, setShowMembers] = useState(false);
  const [cMember, setCMember] = useState({});

  const style = {
    height: "0",
    padding: "0 15px",
    border: "none",
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
              setCurrentChat(cMember);
              navigate("/chatroom/chat");
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
        <span>{"https://www.abc.com/codecrafters".slice(0, 15) + "..."}</span>
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
