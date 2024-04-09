import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import "./RecommendedCommunity.css";

const communities = [
  {
    name: "Developers Villa",
    color: "#A197FC",
  },
  {
    name: "Physics Why?",
    color: "#63B4B8",
  },
  {
    name: "Chemical Lords",
    color: "#FFD28F",
  },
  {
    name: "Maths mafia!",
    color: "#E78895",
  },
];

const RecommendedCommunity = () => {
  return (
    <div className="recommended-communities">
      {communities.map((community, index) => {
        return (
          <div key={index} className={`community${index + 1} com-extra`}>
            <div className="recom-left">
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: community.color,
                  borderRadius: "3px",
                }}
              ></div>
              <h3>{community.name}</h3>
            </div>
            <IoAddCircleOutline className="recom-btn" />
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedCommunity;
