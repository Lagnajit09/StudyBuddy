import React from 'react';
import './CourseHeaderImg.css';
import CourseImg from "../../../assets/Images/CourseImg.svg";

function CourseHeaderImg() {
  return (
    <div className='course-header-img-div'>
      <img src={CourseImg} alt="course headerimg" className='course-header-img'/>
      <a href='https://www.youtube.com' target='_blank'>
      <div className="player"><span>Play</span></div>
      </a>
     
    </div>
    
  );
};

export default CourseHeaderImg;
