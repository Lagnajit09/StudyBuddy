import React from "react";
import "./MainImage.css";
import FindCourseButton from "../FindCourseButton/FindCourseButton";
function MainImage() {
  return (
    <div className="main-image-div">
      <FindCourseButton />
      <img
        src="src\assets\homepage_imgs\landing-page-img1.svg"
        alt="img-1"
        className="main-image"
      />
    </div>
  );
}

export default MainImage;
