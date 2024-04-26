import React from "react";
import "./CourseDest.css";
import { Link } from "react-router-dom";
import YouTube from "../../../../assets/Images/CoursePlatform/YouTube.svg";
import Udemy from "../../../../assets/Images/CoursePlatform/Udemy.svg";
import GeeksForGeeks from "../../../../assets/Images/CoursePlatform/GeeksForGeeks.svg";
import Coursera from "../../../../assets/Images/CoursePlatform/Coursera.svg";
import TutorialsPoint from "../../../../assets/Images/CoursePlatform/TutorialsPoint.svg";

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
        <Link to={"https://www.geeksforgeeks.org/"} target="_blank">
          <img src={GeeksForGeeks} alt="GeeksForGeeks" />
        </Link>
        <Link to={"https://www.tutorialspoint.com/"} target="_blank">
          <img src={TutorialsPoint} alt="TutorialsPoint" />
        </Link>
      </div>
    </div>
  );
};

export default CourseDest;
