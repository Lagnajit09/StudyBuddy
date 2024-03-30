import React from "react";
import "./ChatUsers.css";
import { Avatar } from "@mui/material";
import { useRecoilValue, useRecoilState } from "recoil";
import { chatUsersAtom, currentChatAtom } from "../../store/chatStore";

const ChatUsers = () => {
  const chatUsers = useRecoilValue(chatUsersAtom);
  const [currentChat, setCurrentChat] = useRecoilState(currentChatAtom);

  const chatUserClickHandler = (chatWithUser) => {
    setCurrentChat(chatWithUser);
  };

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + "...";
    }
  }

  return (
    <>
      {chatUsers.map((user) => (
        <div
          className="chatUser"
          key={user.chatUser.id}
          id={user.chatUser.id}
          onClick={() => {
            chatUserClickHandler(user.chatUser);
          }}
          style={{
            backgroundColor:
              currentChat.id === user.chatUser.id ? "#00aaff0d" : "white",
            transition: "all 0.3s ease",
            borderRight:
              currentChat.id === user.chatUser.id ? "3px solid #00A9FF" : null,
          }}
        >
          <Avatar
            src={user.chatUser.firstName}
            alt={user.chatUser.firstName}
            sx={{
              bgcolor: user.chatUser.profile_pic,
              width: "39px",
              height: "39px",
            }}
          />
          <div className="chatUserDetails">
            <h3>{`${user.chatUser.firstName} ${user.chatUser.lastName}`}</h3>
            <p>{truncateString(user.lastMessage, 30)}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatUsers;

// const chatUsers = [
//   {
//     id: 1,
//     name: "Peter Quill",
//     image: "Peter Quill",
//     message: "Newton's law explained.",
//     color: "#fa8100",
//   },
//   {
//     id: 2,
//     name: "David Lewis",
//     image: "David Lewis",
//     message: "Okay!",
//     color: "#b1006a",
//   },
//   {
//     id: 3,
//     name: "Charlie Fox",
//     image: "Charlie Fox",
//     message: "Reaching in 10mins.",
//     color: "#1E88E5",
//   },
//   {
//     id: 4,
//     name: "Alice",
//     image: "Alice",
//     message: "Order received.",
//     color: "#26C6DA",
//   },
//   {
//     id: 5,
//     name: "HarleyQuin",
//     image: "HarleyQuin",
//     message: "At my place.",
//     color: "#AFB42B",
//   },
//   {
//     id: 6,
//     name: "James Doe",
//     image: "James Doe",
//     message: "Busy.",
//     color: "#6200EE",
//   },
//   {
//     id: 7,
//     name: "King",
//     image: "King",
//     message: "Okay!",
//     color: "#03DAC5",
//   },
// ];
