import React, { useEffect, useRef, useState } from "react";
import "./ChatInput.css";
import EmojiPicker from "emoji-picker-react";
import smileyEmoji from "../../../assets/emojiPicker.svg";
import attachment from "../../../assets/attachment.svg";
import { FiSend } from "react-icons/fi";

const ChatInput = (props) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [message, setMessage] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsEmojiOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleEmojiPicker = () => {
    setIsEmojiOpen(!isEmojiOpen);
  };

  const emojiClickHandler = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const handleAttachFiles = () => {};
  return (
    <div>
      <div className="send-message">
        <div
          className="msg-input"
          style={props.open ? { width: "80%" } : { width: "60%" }}
        >
          <span ref={wrapperRef}>
            <EmojiPicker
              open={isEmojiOpen}
              autoFocusSearch={false}
              style={{
                width: "30%",
                height: "400px",
                position: "absolute",
                bottom: "60px",
                left: "20px",
              }}
              searchDisabled={true}
              emojiTooltip={false}
              skinTonesDisabled={true}
              autoFocus={false}
              onEmojiClick={emojiClickHandler}
            />
            <img
              src={smileyEmoji}
              alt="Smiley-Emoji"
              onClick={handleEmojiPicker}
              style={{ width: "20px", height: "20px" }}
            />
          </span>
          <input
            className="send"
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Write a message"
            autoFocus
          />
          <div className="attachInput">
            <label htmlFor="attachFiles">
              <img
                src={attachment}
                alt="Attach-files"
                onClick={handleAttachFiles}
                style={{
                  cursor: "pointer",
                  marginTop: "5px",
                  width: "20px",
                  height: "20px",
                }}
              />
            </label>
            <input type="file" id="attachFiles" style={{ display: "none" }} />
          </div>
        </div>
        <button>
          <div className="send-btn">
            {/* <img src={SendBtn} alt="Send" /> */}
            <FiSend style={{ fontSize: "17px" }} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
