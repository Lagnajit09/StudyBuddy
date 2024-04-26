import React from "react";
import "./Topic.css";
import Physics from "../../../coursepage1_imgs/Images/Topics/Physics.svg";
import Chemistry from "../../../coursepage1_imgs/Images/Topics/Chemistry.svg";
import Mathematics from "../../../coursepage1_imgs/Images/Topics/Mathematics.svg";
import Biology from "../../../coursepage1_imgs/Images/Topics/Biology.svg";
import ITandSW from "../../../coursepage1_imgs/Images/Topics/IT and Software.svg";
import AIandCloud from "../../../coursepage1_imgs/Images/Topics/AI and Cloud Computing.svg";
import TopicItem from "../Topic/TopicItem/TopicItem";

const Topic = () => {
  const topicimg = [
    Physics,
    Chemistry,
    Mathematics,
    Biology,
    ITandSW,
    AIandCloud,
  ];
  return (
    <div className="topic-container">
      <span id="headt-span">Popular Topics</span>
      <div className="child-topic-container">
        <div className="sub-child-topic-container">
          <TopicItem img={topicimg[0]} text="Physics" />
          <TopicItem img={topicimg[1]} text="Chemistry" />
          <TopicItem img={topicimg[2]} text="Mathematics" />
        </div>

        <div className="sub-child-topic-container">
          <TopicItem img={topicimg[3]} text="Biology" />
          <TopicItem img={topicimg[4]} text="IT and Software" />
          <TopicItem img={topicimg[5]} text="AI and Cloud Computing" />
        </div>
      </div>
    </div>
  );
};

export default Topic;
