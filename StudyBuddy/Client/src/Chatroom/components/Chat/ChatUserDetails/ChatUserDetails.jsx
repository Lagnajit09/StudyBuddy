import React from "react";
import "./ChatUserDetails.css";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Avatar } from "@mui/material";
import UserImg1 from "../../../../assets/chatroom_imgs/user-image-1.svg";
import UserImg2 from "../../../../assets/chatroom_imgs/user-image-2.svg";
import UserImg3 from "../../../../assets/chatroom_imgs/user-image-3.svg";
import UserImg4 from "../../../../assets/chatroom_imgs/user-image-4.svg";
import DescriptionIcon from "@mui/icons-material/Description";
import { currentChatAtom } from "../../../../store/chatroomStore/chatStore";
import { useRecoilValue } from "recoil";

const ChatUserDetails = (props) => {
  const currentChat = useRecoilValue(currentChatAtom);
  return (
    <div
      className="chatUser-details"
      style={props.open ? { right: "0" } : null}
    >
      <div className="chatUser-header">
        <h3>Details</h3>
        <button
          className="chatUser-details-button"
          onClick={() => {
            props.setOpen(false);
          }}
        >
          <CloseIcon style={{ width: "20px", height: "20px" }} />
        </button>
      </div>
      <div className="chatUser-name">
        <Avatar
          src={currentChat.firstname}
          alt={currentChat.firstname}
          sx={{
            width: "75px",
            height: "75px",
            backgroundColor: currentChat.profile_pic,
            fontSize: "40px",
          }}
        />
        <h3>{`${currentChat.firstname} ${currentChat.lastname}`}</h3>
      </div>
      <div className="chatUser-about">
        <h4>About</h4>
        <p>{currentChat.bio}</p>
      </div>
      <div className="chatUser-mCommunity">
        <h4>Mutual Community</h4>
        <button className="chatUser-details-button">
          <KeyboardArrowRightIcon style={{ width: "25px", height: "25px" }} />
        </button>
      </div>
      <div className="chatUser-media">
        <div className="chatUser-media-h">
          <p>Uploaded Media</p>
          <span>View all</span>
        </div>
        <div className="chatUser-media-m">
          <img src={UserImg1} alt="" />
          <img src={UserImg2} alt="" />
          <img src={UserImg3} alt="" />
          <img src={UserImg4} alt="" />
        </div>
      </div>
      <div className="chatUser-files">
        <div className="chatUser-media-h">
          <p>Uploaded Files</p>
          <span>View all</span>
        </div>
        <div className="chatUser-files-m">
          <div className="userFile">
            <div className="fileIcon">
              <DescriptionIcon style={{ width: "25px", height: "25px" }} />
            </div>
            <div className="chatUser-fileDetails">
              <p>Physics.pdf</p>
              <span>2.6mb</span>
            </div>
          </div>
          <div className="userFile">
            <div className="fileIcon">
              <DescriptionIcon style={{ width: "25px", height: "25px" }} />
            </div>
            <div className="chatUser-fileDetails">
              <p>Physics.pdf</p>
              <span>2.6mb</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUserDetails;
