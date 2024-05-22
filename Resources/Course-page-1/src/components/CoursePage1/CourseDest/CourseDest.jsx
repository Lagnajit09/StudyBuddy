import React from "react";
import "./CourseDest.css";
import { Link } from "react-router-dom";
import YouTube from "../../../assets/Images/CoursePlatform/YouTube.svg";
import Udemy from "../../../assets/Images/CoursePlatform/Udemy.svg";
import Byjus from "../../../assets/Images/CoursePlatform/Byjus.svg";
import Coursera from "../../../assets/Images/CoursePlatform/Coursera.svg";
import Unacademy from "../../../assets/Images/CoursePlatform/Unacademy.svg";

const CourseDest = () => {
  return (
    <div className="course-dest-container">
      <div className="course-dest-sub-container">
        <Link to={"https://www.youtube.com/"} target="_blank">
          <img src={YouTube} alt="YouTube" />
        </Link>
        <Link to={"https://www.coursera.com/"} target="_blank">
          <img src={Coursera} alt="Coursera" />
        </Link>
        <Link to={"https://www.udemy.com/"} target="_blank">
          <img src={Udemy} alt="Udemy" />
        </Link>
        <Link to={"https://byjus.com/"} target="_blank">
          <img src={Byjus} alt="Byjus" />
        </Link>
        <Link to={"https://unacademy.com/"} target="_blank">
          <img src={Unacademy} alt="Unacademy" />
        </Link>
      </div>
    </div>
  );
};

export default CourseDest;
