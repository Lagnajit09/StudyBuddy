import React from 'react';
import CourseHeader from './Components/CourseHeader/CourseHeader';
import AboutTopic from './Components/AboutTopic/AboutTopic';
import Requirements from './Components/Requirements/Requirements';
import TopicSlider from './Components/TopicSlider/TopicSlider';

function CourseAboutPage() {
  return (
    <>
     <CourseHeader/>
     <AboutTopic/>
     <Requirements/>
     <TopicSlider/>
    </>

  );
};

export default CourseAboutPage;

