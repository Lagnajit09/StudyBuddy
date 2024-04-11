import React from "react";
import "./JoinCommunity.css";
import { IoMdAddCircleOutline } from "react-icons/io";

const JoinCommunity = () => {
  return (
    <button className="joinCommunity">
      JOIN NOW
      <IoMdAddCircleOutline
        style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.847)" }}
      />
    </button>
  );
};

export default JoinCommunity;
