import React, { useState } from "react";
import "./AddToMyCourseButton.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function AddToMyCourseButton() {
  // State to manage the button style
  const [buttonText, setButtonText] = useState("Add to my course");
  const [buttonStyle, setButtonStyle] = useState({
    width: buttonText === "Added" ? "25%" : "35%",
    height: "35%",
    borderRadius: "18px",
    border: "0px",
    backgroundColor: "rgba(208, 213, 221, 1)",
    color: "rgba(0, 0, 0, 0.8)",
    fontSize: "18px",
    cursor: "pointer",
  });

  // State to manage the text of the button

  // State to handle button click
  const handleClick = () => {
    setButtonStyle({
      width: buttonText === "Added" ? "35%" : "25%",
      height: "35%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      borderRadius: "18px",
      border: buttonText === "Added" ? "0px" : "2px solid black",
      outline: "none",
      backgroundColor: "#D0D5DD",
      color: "#000000",
      fontSize: "18px",
      cursor: "pointer",
    });

    // Update button text
    setButtonText((prev) =>
      !(prev === "Added") ? "Added" : "Add to my course"
    );
  };

  return (
    <>
      {/* Button with dynamic style */}
      <button
        style={buttonStyle}
        onClick={handleClick}
        className="add-to-my-course"
      >
        {buttonText} {buttonText === "Added" && <CheckCircleIcon />}
      </button>
    </>
  );
}

export default AddToMyCourseButton;
