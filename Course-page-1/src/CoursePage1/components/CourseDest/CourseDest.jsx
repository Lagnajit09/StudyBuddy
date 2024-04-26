import React from "react";
import "./CourseDest.css";
import { Link } from "react-router-dom";
import YouTube from "../../../coursepage1_imgs/Images/CoursePlatform/YouTube.svg";
import Udemy from "../../../coursepage1_imgs/Images/CoursePlatform/Udemy.svg";
import SkillShare from "../../../coursepage1_imgs/Images/CoursePlatform/SkillShare.svg";
import Coursera from "../../../coursepage1_imgs/Images/CoursePlatform/Coursera.svg";
import GitHub from "../../../coursepage1_imgs/Images/CoursePlatform/GitHub.svg";

const CourseDest = () => {
  return (
    <div className="course-dest-container">
      <div className="course-dest-sub-container">
        <Link to={"https://www.youtube.com/"} target="_blank">
          <img src={YouTube} alt="YouTube" />
        </Link>
        <Link to={"https://www.udemy.com/"} target="_blank">
          <img src={Udemy} alt="Udemy" />
        </Link>
        <Link to={"https://www.skillshare.com/"} target="_blank">
          <img src={SkillShare} alt="SkillShare" />
        </Link>
        <Link to={"https://www.coursera.com/"} target="_blank">
          <img src={Coursera} alt="Coursera" />
        </Link>
        <Link to={"https://www.github.com/"} target="_blank">
          <img src={GitHub} alt="GitHub" />
        </Link>
      </div>
    </div>
  );
};

export default CourseDest;
