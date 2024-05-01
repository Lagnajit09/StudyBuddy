import React, { useState } from "react";
import { course_name } from "../coursepageSlider2";
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
    from="profile"
  />
);

const TopicSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  let style = {};

  if (props.from === "profile") {
    style = {
      slider2Container: {
        height: "215px",
        width: "85%",
        // margin: "0 auto 45px",
      },

      courseCap: {
        margin: "0 0 25px 124.5px",
      },

      prevSlideButton: {
        top: "27.5%",
        left: "6.4%",
        height: "30px",
        width: "30px",
        padding: "2px 1px 2px 1px",
      },

      nextSlideButton: {
        top: "27.5%",
        right: "17.8%",
        height: "30px",
        width: "30px",
        padding: "2px 1px 2px 1px",
      },

      topicWrapper3: {
        gap: "10px",
      },
    };
  }

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
      <span id="courseCap" style={style.courseCap}>
        {props.text}
      </span>
      <div className="slider2Container" style={style.slider2Container}>
        <div
          className="slider2Wrapper"
          style={{
            transform: `translateX(-${currentIndex * 25}vw)`,
          }}
        >
          <div className="topicWrapper3" style={style.topicWrapper3}>
            {createCard(0)}
            {createCard(1)}
            {createCard(2)}
            {createCard(3)}
          </div>
          <div className="topicWrapper3" style={style.topicWrapper3}>
            {createCard(4)}
            {createCard(5)}
            {createCard(6)}
            {createCard(7)}
          </div>
          <div className="topicWrapper3" style={style.topicWrapper3}>
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
          style={style.prevSlideButton}
        >
          <KeyboardArrowLeftRoundedIcon style={{ fontSize: "40" }} />
        </button>
        <button
          onClick={nextSlide}
          className="nextSlideButton"
          style={style.nextSlideButton}
        >
          <KeyboardArrowRightRoundedIcon style={{ fontSize: "40" }} />
        </button>
      </div>
    </div>
  );
};

export default TopicSlider;
