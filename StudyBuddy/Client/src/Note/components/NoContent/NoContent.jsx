import React from "react";
import "./NoContent.css";
import { useNavigate } from "react-router-dom";
import { CiStickyNote } from "react-icons/ci";
import { PiArrowRight } from "react-icons/pi";

const AddToTopic = (props) => {
  const navigate = useNavigate();

  return (
    <div className="add-to-topic">
      {props.icon}
      <p>{props.desc}</p>
      <button
        onClick={() => {
          navigate("/note");
        }}
      >
        Go to All Notes
        <PiArrowRight style={{ fontSize: "20px" }} />
      </button>
    </div>
  );
};

export default AddToTopic;
