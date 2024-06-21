import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ChatUsers.css";
import { Avatar } from "@mui/material";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  chatUsersAtom,
  currentChatAtom,
  newMessageAtom,
} from "../../../../store/chatroomStore/chatStore";
import socket from "../../../../store/chatroomStore/socket";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BASE_URL } from "../../../../config";
import { authUserAtom } from "../../../../store/authAtom";

const ChatUsers = () => {
  const params = useParams();
  const navigate = useNavigate();
  const authUser = useRecoilValue(authUserAtom);
  const [chatUsers, setChatUsers] = useRecoilState(chatUsersAtom);
  const [newMessages, setNewMessages] = useRecoilState(newMessageAtom);
  const [currentChat, setCurrentChat] = useRecoilState(currentChatAtom);

  useEffect(() => {
    socket.on("chatUsersUpdated", (receiverId) => {
      // Update chat users list for recipient
      const fetchSenderDetails = async () => {
        try {
          console.log(authUser);

          const response = await fetch(
            `${BASE_URL}/chatroom/chat/one-user/${authUser.userId}/${receiverId}`,
            {
              headers: {
                Authorization: `Bearer ${authUser.token}`,
              },
            }
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
  }, [params?.userId]);

  useEffect(() => {
    const fetchCurrentUser = async (userId) => {
      if (userId) {
        try {
          const response = await fetch(
            `${BASE_URL}/chatroom/chat/one-user/${authUser.userId}/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${authUser.token}`,
              },
            }
          );
          if (!response.ok) {
            console.log("Error while fetching!");
            return;
          }
          const data = await response.json();
          // console.log(data);
          setCurrentChat(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCurrentUser(userId);
  }, [userId]);

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
                src={user.chatUser.firstname}
                alt={user.chatUser.firstname}
                sx={{
                  bgcolor: user.chatUser.profile_pic,
                  width: "39px",
                  height: "39px",
                }}
              />
              <div className="chatUserDetails">
                <h3>{`${user.chatUser.firstname} ${user.chatUser.lastname}`}</h3>
                <p>{truncateString(user.lastMessage || "", 30)}</p>
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
