import React from "react";
import "./CourseHeaderImg.css";

function CourseHeaderImg(props) {
  return (
    <div className="course-header-img-div">
      <img
        src={props.img}
        alt="course headerimg"
        className="course-header-img"
      />
      <a href={props.link} target="_blank">
        <div className="player">
          <span>Play</span>
        </div>
      </a>
    </div>
  );
}

export default CourseHeaderImg;
