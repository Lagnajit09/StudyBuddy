import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ChatInput.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { authUserAtom } from "../../../store/authUser";
import {
  chatUsersAtom,
  currentChatAtom,
  newMessageAtom,
} from "../../../store/chatStore";
import socket from "../../../store/socket";
import EmojiPicker from "emoji-picker-react";
import smileyEmoji from "../../../../assets/emojiPicker.svg";
import attachment from "../../../../assets/attachment.svg";
import { FiSend } from "react-icons/fi";

const ChatInput = (props) => {
  const { state } = useLocation();
  const sender = useRecoilValue(authUserAtom);
  const receiver = useRecoilValue(currentChatAtom);
  const [newMessages, setNewMessages] = useRecoilState(newMessageAtom);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sendClicked, setSendClicked] = useState(false);
  const wrapperRef = useRef(null);
  const [chatUsers, setChatUsers] = useRecoilState(chatUsersAtom);

  useEffect(() => {
    const handleIncomingMessage = (data) => {
      setNewMessages((prev) => [...prev, data.data]);
      updateLastMessage(sender.id);
      const exists = chatUsers.some(
        (user) => user.chatUser.email === state.chatUser.email
      );
      if (!exists && state) {
        setChatUsers((prev) => [state, ...prev]);
      }
    };

    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, [setNewMessages, chatUsers, state]);

  useEffect(() => {
    setNewMessages([]);
  }, [receiver.id]);

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
    if (sendClicked) {
      postMessages();
    }
  }, [sendClicked]);

  const postMessages = () => {
    const apiUrl = "http://localhost:3000/chatroom/chat";
    const data = {
      senderId: sender.id,
      receiverId: receiver.id,
      content: message,
      timestamp: Date.now(),
    };
    console.log(data);
    socket.emit("message", {
      data,
    });
    socket.emit("updateChatUsers", {
      recipientId: receiver.id,
      senderId: sender.id,
    });
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    updateLastMessage(receiver.id);
    setSendClicked(false);
    setMessage("");
  };

  const updateLastMessage = (userId) => {
    const userIndex = chatUsers.findIndex(
      (user) => user.chatUser.id === userId
    );

    let updatedUsers = [...chatUsers];

    if (userIndex !== -1) {
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        lastMessage: message,
        lastMsgTime: Date.now(),
      };
    }
    updatedUsers.sort(
      (a, b) => new Date(b.lastMsgTime) - new Date(a.lastMsgTime)
    );

    // Return the updated chat users array
    setChatUsers(updatedUsers);
  };

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

  // console.log(chatMessages);

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
