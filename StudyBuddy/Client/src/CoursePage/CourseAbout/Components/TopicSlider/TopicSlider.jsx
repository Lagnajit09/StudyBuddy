import React, { useMemo, useState } from "react";
import CourseCard from "../TopicSlider/CourseCard/CourseCard";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import "./TopicSlider.css";
import { useLocation } from "react-router-dom";

const createCard = (index, course_name) => (
  <CourseCard
    key={course_name[index].id}
    img={course_name[index].img}
    c_name={course_name[index].c_name}
    cap={course_name[index].cap}
    c_dest={course_name[index].c_dest}
    cap_color={course_name[index].cap_color}
    course={course_name}
    index={index}
  />
);

const TopicSlider = (props) => {
  const { state } = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const arr = useMemo(() => {
    return state.related ? state.related : state.course;
  }, [state]);

  let style = {};

  if (props.from === "profile") {
    style = {
      slider2Container: {
        height: "233px",
        width: "89.3%",
        margin: "0 auto",
      },

      courseCap: {
        margin: "33px 0 20px 68px",
      },

      prevSlideButton: {
        top: "48%",
        left: "4%",
      },
      nextSlideButton: {
        top: "48%",
        right: "7%",
      },
    };
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= arr.length - 4 ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? arr.length - 4 : prevIndex - 4
    );
  };

  return (
    <div className="slider2ContainerParent">
      <span className="slider-related-courses">Related Courses</span>
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
          <div className="topicWrapper3">
            {createCard(0, arr)}
            {createCard(1, arr)}
            {createCard(2, arr)}
            {createCard(3, arr)}
          </div>
          <div className="topicWrapper3">
            {createCard(4, arr)}
            {createCard(5, arr)}
            {createCard(6, arr)}
            {createCard(7, arr)}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="cpA-prevSlideButton"
          disabled={currentIndex >= 8 ? true : false}
          style={style.prevSlideButton}
        >
          <KeyboardArrowLeftRoundedIcon style={{ fontSize: "40" }} />
        </button>
        <button
          onClick={nextSlide}
          className="cpA-nextSlideButton"
          style={style.nextSlideButton}
        >
          <KeyboardArrowRightRoundedIcon style={{ fontSize: "40" }} />
        </button>
      </div>
    </div>
  );
};

export default TopicSlider;
