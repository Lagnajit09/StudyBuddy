import React from "react";
import "./AddToTopic.css";
import { useNavigate } from "react-router-dom";
import { CiStickyNote } from "react-icons/ci";
import { PiArrowRight } from "react-icons/pi";

const AddToTopic = () => {
  const navigate = useNavigate();

  return (
    <div className="add-to-topic">
      <CiStickyNote style={{ color: "#00a9ff", fontSize: "70px" }} />
      <p>
        To add a folder or notes to a topic, create a new note or folder in "All
        Notes" and then add it to the desired topic.
      </p>
      <button
        onClick={() => {
          navigate("/note");
        }}
      >
        Go to All Notes
        <PiArrowRight style={{fontSize:"20px"}}/>
      </button>
    </div>
  );
};

export default AddToTopic;
