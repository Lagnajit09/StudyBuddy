import React, { useEffect, useRef, useState } from "react";
import "./ChatInput.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authUserAtom } from "../../../store/authUser";
import {
  currentChatAtom,
  sendMessageAtom,
  chatMessageAtom,
} from "../../../store/chatStore";
import EmojiPicker from "emoji-picker-react";
import smileyEmoji from "../../../assets/emojiPicker.svg";
import attachment from "../../../assets/attachment.svg";
import { FiSend } from "react-icons/fi";

const ChatInput = (props) => {
  const sender = useRecoilValue(authUserAtom);
  const receiver = useRecoilValue(currentChatAtom);
  const [messageSend, setMessageSend] = useRecoilState(sendMessageAtom);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sendClicked, setSendClicked] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsEmojiOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    const apiUrl = "http://localhost:3000/chatroom/chat";
    const data = {
      sender: sender.id,
      receiver: receiver.id,
      content: message,
    };

    if (sendClicked) {
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          setMessageSend(!messageSend);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      sendMessage();
      setSendClicked(false);
      setMessage("");
    }
  }, [sendClicked]);

  const handleEmojiPicker = () => {
    setIsEmojiOpen(!isEmojiOpen);
  };

  const emojiClickHandler = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" ? sendMessage() : null;
  };

  const sendMessage = () => {
    setSendClicked(true);
  };

  const handleAttachFiles = () => {};
  return (
    <div>
      <div className="send-message">
        <div
          className="msg-input"
          style={props.open ? { width: "83%" } : { width: "60%" }}
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
            onKeyUp={handleKeyPress}
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
          <div className="send-btn" onClick={sendMessage}>
            {/* <img src={SendBtn} alt="Send" /> */}
            <FiSend style={{ fontSize: "17px" }} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
