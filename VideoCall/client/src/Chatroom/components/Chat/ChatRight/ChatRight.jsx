import React, { useEffect, useState } from "react";
import "./ChatRight.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentChatAtom, chatMessageAtom } from "../../../store/chatStore";
import { authUserAtom } from "../../../store/authUser";
import ChatInput from "../../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatUserDetails from "../ChatUserDetails/ChatUserDetails";
import ChatHeader from "../../ChatHeader/ChatHeader";

const ChatRight = () => {
  const currentChat = useRecoilValue(currentChatAtom);
  const authUser = useRecoilValue(authUserAtom);
  const setChatMessages = useSetRecoilState(chatMessageAtom);
  const [detailsBtnClicked, setDetailsBtnClicked] = useState(false);

  let fetchedCurrentChatMessage;

  async function fetchCurrentChatMessages() {
    try {
      const response = await fetch(
        `http://localhost:3000/chatroom/chat/current-chat`,
        {
          method: "POST",
          body: JSON.stringify({
            currentChatId: currentChat.id,
            loggedInUserId: authUser.id,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      fetchedCurrentChatMessage = await response.json();
      setChatMessages(fetchedCurrentChatMessage);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchCurrentChatMessages();
  }, [currentChat, authUser]);

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
