import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChatRoomLeft.css";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../../store/authAtom";
import { Avatar } from "@mui/material";
import SearchBar from "../../../NavBar/SearchBar/SearchBar";
import ChatUsers from "../Chat/ChatUsers/ChatUsers";
import JoinedCommunity from "../Community/JoinedCommunity/JoinedCommunity";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";

const ChatRoomLeft = (props) => {
  const authUser = useRecoilValue(authUserAtom);
  const navigate = useNavigate();
  return (
    <div className="chatleft">
      <div className="chatleft-header">
        <div className="userDetials">
          <Avatar
            sx={{
              bgcolor: authUser.user.profile_pic,
              width: "39px",
              height: "39px",
            }}
            alt={authUser.user.firstname.toUpperCase()}
            src="/broken-image.jpg"
          />
          <h3>{`${
            authUser.user.username === authUser.user.email
              ? authUser.user.firstname
              : authUser.user.username
          }`}</h3>
        </div>
        <div className="navigateIcons">
          <PiUsersThree
            style={{
              fontSize: "25px",
              border:
                props.for === "community"
                  ? "2px solid #00A9FF"
                  : "2px solid rgb(0,0,0,0.5)",
              borderRadius: "50%",
              padding: "4px",
              color: props.for === "community" ? "#00A9FF" : "rgb(0,0,0,0.5)",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/chatroom/community`);
            }}
          />
          <IoChatbubbleEllipsesOutline
            style={{
              fontSize: "25px",
              border:
                props.for === "chat"
                  ? "2px solid #00A9FF"
                  : "2px solid rgb(0,0,0,0.5)",
              borderRadius: "50%",
              padding: "4px",
              color: props.for === "chat" ? "#00A9FF" : "rgb(0,0,0,0.5)",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/chatroom/chat");
            }}
          />
        </div>
      </div>
      <div className="chatleft-middle">
        <SearchBar className="chatleftSearch" placeholder="Search" />
        <div className="middle-container">
          <span>Messages</span>
          {props.for === "chat" ? (
            <IoChatbubbleEllipsesOutline
              style={{
                fontSize: "18px",
                color: "rgb(0,0,0,0.5)",
              }}
            />
          ) : (
            <div>
              <IoAddCircleOutline
                style={{
                  fontSize: "20px",
                  color: "rgb(0,0,0,0.5)",
                  marginRight: "9px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  props.setOpen(!props.open);
                }}
              />
              <PiUsersThree
                style={{
                  fontSize: "20px",
                  color: "rgb(0,0,0,0.5)",
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="chatleft-bottom" style={{ overflowY: "scroll" }}>
        {props.for === "chat" ? <ChatUsers /> : <JoinedCommunity />}
      </div>
    </div>
  );
};

export default ChatRoomLeft;
