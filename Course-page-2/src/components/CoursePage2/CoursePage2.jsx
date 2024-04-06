import React from "react";
import TopicSlider from "./TopicSlider/TopicSlider";

const CoursePage2 = () => {
  return (
    <div className="topic-container">
      <TopicSlider text="YouTube" />
      <TopicSlider text="Udemy" />
      <TopicSlider text="SkillShare" />
      <TopicSlider text="Coursera" />
      <TopicSlider text="Unacademy" />
      <TopicSlider text="Geeks for Geeks" />
    </div>
  );
};

export default CoursePage2;
