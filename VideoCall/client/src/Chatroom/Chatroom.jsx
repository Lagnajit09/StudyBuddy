import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { chatUsersAtom, sendMessageAtom } from "../store/chatStore";
import { authUserAtom } from "../store/authUser";
import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/NavBar/SearchBar/SearchBar";
import Chat from "../components/Chat/Chat";
import "./Chatroom.css";
import { Avatar } from "@mui/material";
import { cyan } from "@mui/material/colors";

const Chatroom = () => {
  const setChatUsers = useSetRecoilState(chatUsersAtom);
  const authUser = useRecoilValue(authUserAtom);
  const newMessageSend = useRecoilValue(sendMessageAtom);
  const [updateState, setUpdateState] = useState(false);

  let fetchedData;

  async function fetchChatroomData() {
    try {
      const response = await fetch(`http://localhost:3000/chatroom/chat`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
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
    setUpdateState(newMessageSend);
  }, [newMessageSend]);

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
      <Chat />
    </div>
  );
};

export default Chatroom;
