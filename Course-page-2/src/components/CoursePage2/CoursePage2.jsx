import React from "react";
import "./CoursePage2.css";
import TopicSlider from "./TopicSlider/TopicSlider";
import SocialPlatformBar from "./SocialPlatformBar/SocialPlatformBar";
import { course_name } from "./coursepageSlider2";

const CoursePage2 = () => {
  const courseDest = [];
  courseDest.push(...course_name);

  return (
    <>
      <SocialPlatformBar from="Course-page-2" />

      <div className="topic-container">
        <h2 id="course-name-heading">Physics</h2>
        <TopicSlider text="YouTube" id="youtube" />
        <TopicSlider text="Udemy" id="udemy" />
        <TopicSlider text="Coursera" id="coursera" />
        <TopicSlider text="Unacademy" id="unacademy" />
        <TopicSlider text="Geeks for Geeks" id="geeksforgeeks" />
      </div>
    </>
  );
};

export default CoursePage2;
