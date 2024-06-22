import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ChatUsers.css";
import { Avatar } from "@mui/material";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  chatMessageAtom,
  chatUsersAtom,
  currentChatAtom,
  newMessageAtom,
} from "../../../../store/chatroomStore/chatStore";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BASE_URL } from "../../../../config";
import { authUserAtom } from "../../../../store/authAtom";

const ChatUsers = () => {
  const params = useParams();
  const navigate = useNavigate();
  const authUser = useRecoilValue(authUserAtom);
  const [chatUsers, setChatUsers] = useRecoilState(chatUsersAtom);
  const setNewMessages = useSetRecoilState(newMessageAtom);
  const setMessages = useSetRecoilState(chatMessageAtom)
  const [currentChat, setCurrentChat] = useRecoilState(currentChatAtom);
  const [showOpts, setShowOpts] = useState(false)
  const chatListRef = useRef(null);

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

  function truncateString(msg, maxLength) {
    if(msg.type === 'doc') return 'File'
    if (msg.content.length <= maxLength) {
      return msg.content;
    } else {
      return msg.content.slice(0, maxLength) + "...";
    }
  }

  const handleRightClick = (e, chatUserId) => {
    e.preventDefault();
    setShowOpts(chatUserId);
  };

  const handleClickOutside = (event) => {
    if (chatListRef.current && !chatListRef.current.contains(event.target)) {
      setShowOpts(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const deleteChat = async (event, userId, index) => {
    event.stopPropagation()
    const updatedChatUsers = chatUsers.filter((user) => user.chatUser.id !== userId)
    setChatUsers(updatedChatUsers)

    try {
      await fetch(
        `${BASE_URL}/chatroom/chat/${userId}/${authUser.userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
          body: JSON.stringify({userId:authUser.userId})
        }
      );

    } catch (error) {
      console.error(error)
    }
    
    if(currentChat.id === userId){
      setCurrentChat({})
      setMessages([])
      navigate(`/chatroom/chat`)
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
              onContextMenu={(e) => handleRightClick(e, user.chatUser.id)}
            >
              {showOpts === user.chatUser.id && (
                <div className="delete-chat" ref={chatListRef} onClick={(e) => deleteChat(e, user.chatUser.id, index)}>
                  <p>Delete chat</p>
                </div>
              )}
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
                <p>{truncateString(user.lastMessage || {}, 30)}</p>
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
