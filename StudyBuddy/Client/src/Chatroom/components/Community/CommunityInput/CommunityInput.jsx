import React, { useEffect, useRef, useState } from "react";
import "./CommunityInput.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authUserAtom } from "../../../../store/authAtom";
import EmojiPicker from "emoji-picker-react";
import smileyEmoji from "../../../../assets/chatroom_imgs/emojiPicker.svg";
import attachment from "../../../../assets/chatroom_imgs/attachment.svg";
import { FiSend } from "react-icons/fi";
import {
  currentCommunityAtom,
  joinedCommunitiesAtom,
  newCommunityMsgAtom,
} from "../../../../store//chatroomStore/communityStore";
import { collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from "../../../../firebase";


const CommunityInput = (props) => {
  const sender = useRecoilValue(authUserAtom);
  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const setNewCommunityMessages = useSetRecoilState(newCommunityMsgAtom);
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(
    joinedCommunitiesAtom
  );
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
    if (sendClicked) {
      postCommunityMessages();
    }
  }, [sendClicked]);

  useEffect(() => {
    if (currentCommunity) {
      const messagesRef = collection(db, 'communityMessages');
      const q = query(messagesRef,
        where('community', '==', currentCommunity._id)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        msgs.sort((a, b) => a.createdAt - b.createdAt);
        setNewCommunityMessages(msgs);
      }, (error) => {
        console.error("Error fetching community messages:", error);
      });

      return () => unsubscribe();
    }
  }, [currentCommunity, setNewCommunityMessages]);

  const postCommunityMessages = async () => {
    const data = {
      userId: sender.userId,
      sender: sender.userId,
      community: currentCommunity._id,
      content: message,
      createdAt: Date.now(),
    };

    try {
      await addDoc(collection(db, 'communityMessages'), data);
      console.log("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    updateLastMessage();
    setSendClicked(false);
    setMessage("");
  };

  const updateLastMessage = () => {
    const communityIndex = joinedCommunities.findIndex(
      (community) => community._id === currentCommunity._id
    );

    let updatedCommunities = [...joinedCommunities];

    if (communityIndex !== -1) {
      updatedCommunities[communityIndex] = {
        ...updatedCommunities[communityIndex],
        lastMessage: message,
        lastMsgTime: Date.now(),
      };
    }
    updatedCommunities.sort(
      (a, b) => new Date(b.lastMsgTime) - new Date(a.lastMsgTime)
    );

    // Return the updated chat users array
    setJoinedCommunities(updatedCommunities);
  };

  const handleEmojiPicker = () => {  setIsEmojiOpen(!isEmojiOpen);  };

  const emojiClickHandler = (emoji) => {  setMessage((prev) => prev + emoji.emoji);  };

  const handleKeyPress = (e) => {  e.key === "Enter" ? sendMessage() : null;  };

  const sendMessage = () => {  setSendClicked(true);  };

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
            <FiSend style={{ fontSize: "17px" }} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CommunityInput;