import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { chatUsersAtom } from "./store/chatStore";
import { authUserAtom } from "./store/authUser";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/NavBar/SearchBar/SearchBar";
import Chat from "./components/Chat/Chat";
import Community from "./components/Community/Community";
import "./Chatroom.css";
import { Avatar } from "@mui/material";

const Chatroom = () => {
  const setChatUsers = useSetRecoilState(chatUsersAtom);
  const authUser = useRecoilValue(authUserAtom);
  const [openChat, setOpenChat] = useState(false);
  const [openCommunity, setOpenCommunity] = useState(false);

  const location = useLocation();

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

  console.log(authUser);

  async function fetchChatroomData() {
    try {
      const response = await fetch(
        `http://localhost:3000/chatroom/chat/${authUser.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      fetchedData = await response.json();
      setChatUsers(fetchedData.sortedData);
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
        <h2>Study Buddy.</h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" placeholder="Search Chat Room" />
        <p>Chat Room</p>
        <p>Notes</p>
        <Avatar
          src={authUser.firstName}
          alt={authUser.firstName}
          sx={{ bgcolor: authUser.profile_pic, width: "30px", height: "30px" }}
        />
      </NavBar>
      {openChat && !openCommunity && <Chat />}
      {!openChat && openCommunity && <Community />}
    </div>
  );
};

export default Chatroom;
