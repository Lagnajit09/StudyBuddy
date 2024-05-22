import React from "react";
import "./FindCourseButton.css";
import { Link } from "react-router-dom";
function FindCourseButton() {
  return (
    <Link to={"/course"} className="button-container">
      <button className="button">Find Course</button>
    </Link>
  );
}

export default FindCourseButton;
