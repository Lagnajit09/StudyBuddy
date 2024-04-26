import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./CourseHeader.css";
import CourseHeaderImg from "./CourseHeaderImg/CourseHeaderImg";
import AddToMyCourseButton from "./AddToMyCourseButton/AddToMyCourseButton";

function CourseHeader() {
  const { state } = useLocation();
  return (
    <div className="course-header">
      <CourseHeaderImg
        img={state.course[state.index].img}
        link={state.course[state.index].c_link}
      />
      <div className="course-header-div">
        <div className="course-header-title">
          <span className="course-header-title-span">
            {state.course[state.index].cap}
          </span>
          <span className="course-created-by">
            Created by{" "}
            {state.course[state.index].createdBy ||
              state.course[state.index].c_dest}
            .
          </span>
        </div>

        <div className="course-header-buttons">
          <Link
            to={state.course[state.index].c_link}
            className="start-course-button"
            target="_blank"
          >
            <button className="btn">Start Course</button>
          </Link>
          <AddToMyCourseButton />
        </div>
      </div>
    </div>
  );
}

export default CourseHeader;
