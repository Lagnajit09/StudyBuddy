import React from "react";
import "./Topic.css";
import Phy from "../../../../assets/Images/Topics/Physics.svg";
import Chem from "../../../../assets/Images/Topics/Chemistry.svg";
import Math from "../../../../assets/Images/Topics/Mathematics.svg";
import Bio from "../../../../assets/Images/Topics/Biology.svg";
import ITandSW from "../../../../assets/Images/Topics/IT and Software.svg";
import AIandCloud from "../../../../assets/Images/Topics/AI and Cloud Computing.svg";
import TopicItem from "../Topic/TopicItem/TopicItem";
import { useNavigate } from "react-router-dom";
import { Physics } from "../../../../CoursesSource/Physics";
import { Chemistry } from "../../../../CoursesSource/Chemistry";
import { Biology } from "../../../../CoursesSource/Biology";
import { Mathematics } from "../../../../CoursesSource/Mathematics";
import { ITandSoftware } from "../../../../CoursesSource/ITandSoftware";
import { AIandCloudComputing } from "../../../../CoursesSource/AIandCloudComputing";

const topicimg = [Phy, Chem, Math, Bio, ITandSW, AIandCloud];

const Topic = () => {
  const navigate = useNavigate();

  return (
    <div className="topic-container">
      <span id="headt-span">Popular Topics</span>
      <div className="child-topic-container">
        <div className="sub-child-topic-container">
          <TopicItem
            img={topicimg[0]}
            text="Physics"
            onClick={() => {
              navigate("/courses/Physics", {
                state: { name: "Physics", arr: Physics },
              });
            }}
          />
          <TopicItem
            img={topicimg[1]}
            text="Chemistry"
            onClick={() => {
              navigate("/courses/Chemistry", {
                state: { name: "Chemistry", arr: Chemistry },
              });
            }}
          />
          <TopicItem
            img={topicimg[2]}
            text="Mathematics"
            onClick={() => {
              navigate("/courses/Mathematics", {
                state: { name: "Mathematics", arr: Mathematics },
              });
            }}
          />
        </div>

        <div className="sub-child-topic-container">
          <TopicItem
            img={topicimg[3]}
            text="Biology"
            onClick={() => {
              navigate("/courses/Biology", {
                state: { name: "Biology", arr: Biology },
              });
            }}
          />
          <TopicItem
            img={topicimg[4]}
            text="IT and Software"
            onClick={() => {
              navigate("/courses/ITandSoftware", {
                state: { name: "IT and Software", arr: ITandSoftware },
              });
            }}
          />
          <TopicItem
            img={topicimg[5]}
            text="AI and Cloud Computing"
            onClick={() => {
              navigate("/courses/AIandCloudComputing", {
                state: {
                  name: "AI and Cloud Computing",
                  arr: AIandCloudComputing,
                },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Topic;
