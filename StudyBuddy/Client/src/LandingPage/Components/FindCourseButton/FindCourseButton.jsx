import React from "react";
import "./FindCourseButton.css";
import { Link } from "react-router-dom";
function FindCourseButton() {
  return (
    <Link to={"/courses"} className="button-container">
      <button className="button">Find Course</button>
    </Link>
  );
}

export default FindCourseButton;
