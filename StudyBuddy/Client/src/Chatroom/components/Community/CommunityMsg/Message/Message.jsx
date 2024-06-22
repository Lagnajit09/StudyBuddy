import React from "react";
import "./Message.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { useRecoilState } from "recoil";
import {
  communityMemberDetailsAtom,
} from "../../../../../store/chatroomStore/communityStore";
import File from "../../../File";

const Message = ({
  message,
  styleMessage,
  styleMsgL,
  msgText,
  profile,
  authUser,
}) => {
  const [member, setMember] = useRecoilState(communityMemberDetailsAtom);

  console.log(message)

  function getTimeWithAMPM(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    const timeString = hours + ":" + minutes + " " + ampm;

    return timeString;
  }

  const openMemberDetails = () => {
    message.sender && setMember(message.sender);
  };

  return (
    <>
      {message && (
        <div>
          <div className="message" style={styleMessage}>
            {message?.adminMsg !== true && (
              <Avatar
                sx={{
                  height: profile?.height || "30px",
                  width: profile?.width || "30px",
                  fontSize: profile?.fontSize,
                  backgroundColor: message.sender?.profile_pic,
                  position: profile?.position,
                  top: "14%",
                }}
                src={message.sender?.profile_pic}
                alt={message.sender?.firstname}
              />
            )}
            <div className="message-top" style={styleMsgL}>
              {message?.adminMsg !== true && (
                <span
                  className="message-details"
                  style={{
                    flexDirection: authUser ? "row-reverse" : "row",
                    marginRight: authUser ? "20px" : "",
                  }}
                >
                  {!authUser && (
                    <>
                      <p
                        className="message-name"
                        onClick={openMemberDetails}
                      >{` ${
                        message?.sender
                          ? message.sender.firstname +
                            " " +
                            message.sender.lastname
                          : "User"
                      }`}</p>
                      <span style={{ fontWeight: "900", paddingBottom: "3px" }}>
                        .
                      </span>{" "}
                    </>
                  )}
                  {getTimeWithAMPM(message?.createdAt)}
                </span>
              )}
              <div
                className="msg-bot"
                style={{ flexDirection: authUser ? "row-reverse" : "row" }}
              >
              {
                message?.type === 'doc' ?
                  <File file={message?.file} otherStyles={authUser ? {marginRight: "20px"} : {}}  />
                :
                <span className="message-text" style={msgText}>
                    {message?.message}
                </span>
              }
                {message?.adminMsg !== true && (
                  <div className="moreIcon">{<MoreVertIcon />}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
