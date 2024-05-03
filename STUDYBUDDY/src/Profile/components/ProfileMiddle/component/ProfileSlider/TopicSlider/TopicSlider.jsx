import React, { useEffect, useState } from "react";
import CourseCard from "../TopicSlider/CourseCard/CourseCard";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import "./TopicSlider.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  recommendedCoursesAtom,
  userCoursesAtom,
} from "../../../../../../store/profileStore/profileStore";
import { generateRecommendations } from "../../generateReccomendations";

const TopicSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const userCourses = useRecoilValue(userCoursesAtom);
  const [recommendedCourses, setRecommendedCourses] = useRecoilState(
    recommendedCoursesAtom
  );

  useEffect(() => {
    generateRecommendations(userCourses, setRecommendedCourses);
  }, [userCourses, setRecommendedCourses]);

  console.log(recommendedCourses);

  const createCard = (index) => {
    if (recommendedCourses.length === 0) return null; // Check if recommendedCourses is empty
    if (index < 0 || index >= recommendedCourses.length) return null; // Check if index is out of bounds

    return (
      <CourseCard
        key={recommendedCourses[index].id}
        img={recommendedCourses[index].img}
        c_name={recommendedCourses[index].c_name}
        cap={recommendedCourses[index].cap}
        c_dest={recommendedCourses[index].c_dest}
        cap_color={recommendedCourses[index].cap_color}
        course={recommendedCourses}
        index={index}
        from="profile"
      />
    );
  };

  let style = {};

  if (props.from === "profile") {
    style = {
      slider2Container: {
        height: "215px",
        width: "74.4%",
        margin: "0px 95px 50px",
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
      prevIndex >= recommendedCourses.length - 4 ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? recommendedCourses.length - 4 : prevIndex - 4
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
