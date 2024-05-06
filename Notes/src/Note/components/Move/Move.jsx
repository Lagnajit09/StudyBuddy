import React from "react";
import "./Move.css";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Move = (props) => {
  return (
    <div
      className="move-container"
      style={{ bottom: props.move === true ? "3%" : "-10%" }}
    >
      <span>Moved</span>
      <IoIosCheckmarkCircle style={{ fontSize: "17", color: "#ffffff" }} />
    </div>
  );
};

export default Move;
