import React from "react";
import "./AboutTopic.css";
import AboutTopicContents from "./AboutTopicContents/AboutTopicContents";
// import ShowMoreLess from './ShowMoreLess/ShowMoreLess';

function AboutTopic({ about }) {
  return (
    <div className="about-topic-div">
      <span className="about-topic-header">About Topic</span>
      <AboutTopicContents about={about} />
      {/* <ShowMoreLess/> */}
    </div>
  );
}

export default AboutTopic;
