import React from "react";
import "./Message.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { useRecoilState } from "recoil";
import {
  communityMemberDetailsAtom,
} from "../../../../../store/chatroomStore/communityStore";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const File = ({file, otherStyles}) => {
  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1048576) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / 1048576).toFixed(2)} MB`;
    }
  };

  const fileName = () => (
    (file.name.split('.')[0].length > 10 ? `${file.name.split('.')[0].slice(0,10)}...` : file.name.split('.')[0]) + `.${file.name.split('.')[1]}`
  )

  console.log(file)

  const saveFile = () => {
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.name;
    a.target = '_blank'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 15px', borderRadius: '5px', border: '1px solid #FFFFFF', backgroundColor: '#ffffff', cursor: 'pointer', ...otherStyles }}
    onClick={saveFile}
    >
      <div style={{ backgroundColor: '#00A9FF', padding: '3px', borderRadius: '3px' }}>
        <SaveAltIcon style={{ color: 'white', width: '15px', height: '15px' }} />
      </div>
      <div style={{ display: 'flex', gap: '3px', flexDirection: 'column' }}>
        <p>{fileName()}</p>
        <p style={{fontSize: '10px', color: 'gray'}}>{formatFileSize(file.size)}</p>
      </div>
    </div>
  );
}

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
