import React from "react";
import './CoursePage2.css';
import TopicSlider from "./TopicSlider/TopicSlider";
import SocialPlatformBar from "./SocialPlatformBar/SocialPlatformBar";

const CoursePage2 = () => {
  return (
    <>
      <SocialPlatformBar from='Course-page-2'/>
      <div className="topic-container">
      <TopicSlider text="YouTube" id="youtube" />
      <TopicSlider text="Udemy" id="udemy" />
      <TopicSlider text="SkillShare" id="skillshare"/>
      <TopicSlider text="Coursera" id="coursera" />
      <TopicSlider text="Unacademy" id="unacademy" />
      <TopicSlider text="Geeks for Geeks" id="geeksforgeeks" />
    </div>
    </>
    
  );
};

export default CoursePage2;
