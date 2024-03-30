import React, { useState } from "react";
import { course_name } from "../../CoursePage1/coursepageSlider2";
import CourseCard from "../TopicSlider/CourseCard/CourseCard";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import "./TopicSlider.css";
import { cardClasses } from "@mui/material";

const createCard = (index) => (
  <CourseCard
    key={course_name[index].id}
    img={course_name[index].img}
    c_name={course_name[index].c_name}
    cap={course_name[index].cap}
    c_dest={course_name[index].c_dest}
    cap_color={course_name[index].cap_color}
  />
);

const TopicSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= course_name.length - 4 ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? course_name.length - 4 : prevIndex - 4
    );
  };

  return (
    <div className="slider2ContainerParent">
      <span id="courseCap">Best Courses</span>
      <div className="slider2Container">
        <div
          className="slider2Wrapper"
          style={{
            transform: `translateX(-${currentIndex * 25}vw)`,
          }}
        >
          <div className="topicWrapper3">
            {createCard(0)}
            {createCard(1)}
            {createCard(2)}
            {createCard(3)}
          </div>
          <div className="topicWrapper3">
            {createCard(4)}
            {createCard(5)}
            {createCard(6)}
            {createCard(7)}
          </div>
          <div className="topicWrapper3">
            {createCard(8)}
            {createCard(9)}
            {createCard(10)}
            {createCard(11)}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="prevSlideButton"
          disabled={currentIndex >= 8 ? true : false}
        >
          <KeyboardArrowLeftRoundedIcon style={{ fontSize: "40" }} />
        </button>
        <button onClick={nextSlide} className="nextSlideButton">
          <KeyboardArrowRightRoundedIcon style={{ fontSize: "40" }} />
        </button>
      </div>
    </div>
  );
};

export default TopicSlider;
