import React from "react";
import "./ChatUsers.css";
import { Avatar } from "@mui/material";

const ChatUsers = () => {
  const chatUsers = [
    {
      id: 1,
      name: "Peter Quill",
      image: "Peter Quill",
      message: "Newton's law explained.",
      color: "#fa8100",
    },
    {
      id: 2,
      name: "David Lewis",
      image: "David Lewis",
      message: "Okay!",
      color: "#b1006a",
    },
    {
      id: 3,
      name: "Charlie Fox",
      image: "Charlie Fox",
      message: "Reaching in 10mins.",
      color: "#1E88E5",
    },
    {
      id: 4,
      name: "Alice",
      image: "Alice",
      message: "Order received.",
      color: "#26C6DA",
    },
    {
      id: 5,
      name: "HarleyQuin",
      image: "HarleyQuin",
      message: "At my place.",
      color: "#AFB42B",
    },
    {
      id: 6,
      name: "James Doe",
      image: "James Doe",
      message: "Busy.",
      color: "#6200EE",
    },
    {
      id: 7,
      name: "King",
      image: "King",
      message: "Okay!",
      color: "#03DAC5",
    },
  ];
  return (
    <>
      {chatUsers.map((user) => (
        <div className="chatUser" key={user.id}>
          <Avatar
            src={user.image}
            alt={user.image}
            sx={{ bgcolor: user.color, width: "39px", height: "39px" }}
          />
          <div className="chatUserDetails">
            <h3>{user.name}</h3>
            <p>{user.message}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatUsers;
