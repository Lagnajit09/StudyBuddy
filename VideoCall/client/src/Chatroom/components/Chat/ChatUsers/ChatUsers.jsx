import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ChatUsers.css";
import { Avatar } from "@mui/material";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  chatUsersAtom,
  currentChatAtom,
  newMessageAtom,
} from "../../../store/chatStore";
import socket from "../../../store/socket";
import { IoMdAddCircleOutline } from "react-icons/io";

const ChatUsers = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [chatUsers, setChatUsers] = useRecoilState(chatUsersAtom);
  const [newMessages, setNewMessages] = useRecoilState(newMessageAtom);
  const [currentChat, setCurrentChat] = useRecoilState(currentChatAtom);

  useEffect(() => {
    socket.on("chatUsersUpdated", (receiverId) => {
      // Update chat users list for recipient
      const fetchSenderDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/chatroom/chat/one-user/${receiverId}`
          );
          if (!response.ok) {
            console.log("Error while fetching!");
          }
          const data = await response.json();
          const dataChatUser = { chatUser: data };
          const exists = chatUsers.some(
            (user) => user.chatUser.email === dataChatUser.chatUser.email
          );
          !exists ? setChatUsers((prev) => [dataChatUser, ...prev]) : null;
        } catch (error) {
          console.log(error);
        }
      };
      fetchSenderDetails();
    });

    return () => {
      socket.off("chatUsersUpdated");
    };
  }, [chatUsers, setChatUsers]);

  const userId = useMemo(() => {
    return params.userId;
  }, [params]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:3000/chatroom/chat/one-user/${userId}`
          );
          if (!response.ok) {
            console.log("Error while fetching!");
          }
          const data = await response.json();
          setCurrentChat(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCurrentUser();
  }, [params?.userId]);

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
      {chatUsers?.length ? (
        <div>
          {chatUsers.map((user, index) => (
            <div
              className="chatUser"
              key={index}
              id={user.chatUser.id}
              onClick={() => {
                chatUserClickHandler(user.chatUser);
                setNewMessages([]);
                navigate(`/chatroom/chat/${user.chatUser.id}`);
              }}
              style={{
                backgroundColor:
                  currentChat.id === user.chatUser.id ? "#00aaff0d" : "white",
                transition: "all 0.3s ease",
                borderRight:
                  currentChat.id === user.chatUser.id
                    ? "3px solid #00A9FF"
                    : null,
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
                {/* <p>{truncateString(user.lastMessage, 30)}</p> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <IoMdAddCircleOutline className="no-chat" />
        </div>
      )}
    </>
  );
};

export default ChatUsers;

// newMessages.map((m) => {
//   let latest = user.lastMsgTime;
//   latest =
//     m.receiverId === user.chatUser.id
//       ? Math.max(m.timestamp, latest)
//       : null;
//   return latest;
// }) +

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
