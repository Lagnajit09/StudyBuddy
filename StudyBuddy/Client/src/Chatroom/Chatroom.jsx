import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { chatUsersAtom } from "../store/chatroomStore/chatStore";
import { authUserAtom } from "../store/authAtom";
import socket from "../store/chatroomStore/socket";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../NavBar/SearchBar/SearchBar";
import Chat from "./components/Chat/Chat";
import Community from "./components/Community/Community";
import "./Chatroom.css";
import { BASE_URL } from "../config";
import { FaCode } from "react-icons/fa6";

const Chatroom = () => {
  const setChatUsers = useSetRecoilState(chatUsersAtom);
  const authUser = useRecoilValue(authUserAtom);
  const [openChat, setOpenChat] = useState(false);
  const [openCommunity, setOpenCommunity] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  if (!authUser.user) {
    useEffect(() => {
      navigate("/");
    }, [authUser]);
    return;
  }

  useEffect(() => {
    const userId = authUser.userId;
    socket.emit("userId", { userId, joinedCommunities: [] });
  }, []);

  useEffect(() => {
    if (location.pathname.includes("/community")) {
      setOpenChat(false);
      setOpenCommunity(true);
    } else if (location.pathname.includes("/chat")) {
      setOpenChat(true);
      setOpenCommunity(false);
    }
  }, [location]);

  let fetchedData;

  async function fetchChatroomData() {
    try {
      const response = await fetch(
        `${BASE_URL}/chatroom/chat/${authUser.userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      fetchedData = await response.json();
      console.log(fetchedData);
      setChatUsers(fetchedData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchChatroomData();
  }, []);

  return (
    <div className="chatroom">
      <NavBar>
        <h2
          onClick={() => {
            navigate("/");
          }}
        >
          Study Buddy.
        </h2>
        <p
          onClick={() => {
            navigate("/courses");
          }}
        >
          Courses
        </p>
        <SearchBar className="searchWidth" placeholder="Search Chat Room" />
        <p
          onClick={() => {
            navigate("/chatroom/community");
          }}
        >
          Chat Room
        </p>
        <p
          onClick={() => {
            navigate("/note");
          }}
        >
          Notes
        </p>
      </NavBar>
      {/* <div className="maintainance-chatroom">
        <FaCode style={{ width: "25px", height: "25px" }} />
        <span>The chatroom is currently under maintainance.</span>
      </div> */}
      {openChat && !openCommunity && <Chat />}
      {!openChat && openCommunity && <Community />}
    </div>
  );
};

export default Chatroom;
