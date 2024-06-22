import React from "react";
import "./Message.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import File from "../../../File";

const Message = ({ message, styleMessage, styleMsgL, msgText, showIcon }) => {
  function getTimeWithAMPM(timestamp) {
    // Convert MongoDB timestamp to JavaScript Date object
    const date = new Date(timestamp);

    // Get hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Convert hours to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock

    // Add leading zeros to minutes if needed
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the time string
    const timeString = hours + ":" + minutes + " " + ampm;

    return timeString;
  }

  return (
    <>
      {message && (
        <div>
          <div className="message" style={styleMessage}>
            <div className="message-left" style={styleMsgL}>
              <span className="message-time">
                {getTimeWithAMPM(message.timestamp)}
              </span>
              <div className="msg-bot">
              {
                message?.type === 'doc' ?
                  <File file={message?.file}  />
                :
                <span className="message-text" style={msgText}>
                    {message?.content}
                </span>
              }
                <div className="moreIcon">{showIcon && <MoreVertIcon />}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
