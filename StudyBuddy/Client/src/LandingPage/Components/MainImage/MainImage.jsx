import React from "react";
import "./MainImage.css";
import FindCourseButton from "../FindCourseButton/FindCourseButton";
import MainImg from "../../../assets/homepage_imgs/landing-page-img1.svg";
function MainImage() {
  return (
    <div className="main-image-div">
      <FindCourseButton />
      <img src={MainImg} alt="img-1" className="main-image" />
    </div>
  );
}

export default MainImage;
