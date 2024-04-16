import React from 'react';
import './CourseHeader.css';
import CourseHeaderImg from './CourseHeaderImg/CourseHeaderImg';
import AddToMyCourseButton from './AddToMyCourseButton/AddToMyCourseButton';

function CourseHeader() {
  return (
    <div className='course-header'>
      <CourseHeaderImg/>
      <div className='course-header-div'>
       
       <div className='course-header-title'>
         <span className='course-header-title-span'>Artificial Intelligence A-Z 2024: Build 7 AI + LLM & ChatGPT</span>
         <span className='course-created-by'>Created by Hadelin de Ponteves</span>
        </div>

       <div className='course-header-buttons'>
          <button className='start-course-button'>Start Course</button>
          <AddToMyCourseButton/>
       </div>
      </div>

    </div>

  );
};

export default CourseHeader;
