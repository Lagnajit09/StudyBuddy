import React, { useEffect, useState } from "react";
import "./ChatRight.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentChatAtom,
  chatMessageAtom,
} from "../../../../store/chatroomStore/chatStore";
import { authUserAtom } from "../../../../store/authAtom";
import ChatInput from "../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatUserDetails from "../ChatUserDetails/ChatUserDetails";
import ChatHeader from "../ChatHeader/ChatHeader";
import { BASE_URL } from "../../../../config";
import { collection, deleteDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";

const ChatRight = () => {
  const currentChat = useRecoilValue(currentChatAtom);
  const authUser = useRecoilValue(authUserAtom);
  const setChatMessages = useSetRecoilState(chatMessageAtom);
  const [detailsBtnClicked, setDetailsBtnClicked] = useState(false);

  let fetchedCurrentChatMessage;

  async function fetchCurrentChatMessages() {
    try {
      const response = await fetch(`${BASE_URL}/chatroom/chat/current-chat`, {
        method: "POST",
        body: JSON.stringify({
          currentChatId: currentChat.id || currentChat._id,
          loggedInUserId: authUser.userId,
          userId: authUser.userId,
        }),
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      fetchedCurrentChatMessage = await response.json();
      setChatMessages(fetchedCurrentChatMessage);
      // console.log(fetchedCurrentChatMessage);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchCurrentChatMessages();
  }, [currentChat, authUser]);

  console.log(currentChat)

  // useEffect(() => {
  //   return () => {
  //     // Clean up previous chat messages when receiver changes
  //     if (currentChat.id !== null) {
  //       const prevChatId = [authUser.userId, currentChat.id].sort().join('_');
  //       const messagesRef = collection(db, 'privateMessages');
  //       const q = query(
  //         messagesRef,
  //         where('chatId', '==', prevChatId)
  //       );

  //       onSnapshot(q, (snapshot) => {
  //         snapshot.forEach((doc) => {
  //           deleteDoc(doc.ref);
  //         });
  //       }, (error) => {
  //         console.error("Error deleting messages:", error);
  //       });
  //     }
  //   };
  // }, [authUser.userId, currentChat.id]);

  return (
    <div className="chatright">
      <div
        className="chat-user"
        style={detailsBtnClicked ? { width: "73%" } : { width: "100%" }}
      >
        <ChatHeader
          setDetailsBtnClicked={setDetailsBtnClicked}
          detailsBtnClicked={detailsBtnClicked}
          current={currentChat}
        />
        <ChatMessage />
        <ChatInput open={detailsBtnClicked} />
      </div>

      <ChatUserDetails
        open={detailsBtnClicked}
        setOpen={setDetailsBtnClicked}
      />
    </div>
  );
};

export default ChatRight;
