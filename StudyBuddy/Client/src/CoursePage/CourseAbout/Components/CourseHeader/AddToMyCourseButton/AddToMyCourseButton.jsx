import React, { useEffect, useState } from "react";
import "./AddToMyCourseButton.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { addCourse, removeCourse } from "./editCourse";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../../../../store/authAtom";

function AddToMyCourseButton() {
  const authUser = useRecoilValue(authUserAtom);
  const { state } = useLocation();
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
  useEffect(() => {
    if (state.added === true) {
      setButtonText("Added");
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
    }
  }, [state]);

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

    //if button text is Add-to-my-course then upload to database
    if (buttonText === "Add to my course")
      addCourse(state.course[state.index], authUser.userId, authUser.token);

    //if button text is Added then remove the course from database
    if (buttonText === "Added")
      removeCourse(state.course[state.index], authUser.userId, authUser.token);

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
