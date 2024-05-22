import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import "./RecommendedCommunity.css";
import { useNavigate } from "react-router-dom";

const communities = [
  {
    id: "",
    name: "Developers Villa",
    color: "#A197FC",
  },
  {
    id: "",
    name: "Physics Why?",
    color: "#63B4B8",
  },
  {
    id: "",
    name: "Chemical Lords",
    color: "#FFD28F",
  },
  {
    id: "",
    name: "Maths mafia!",
    color: "#E78895",
  },
];

const RecommendedCommunity = () => {
  const navigate = useNavigate();

  return (
    <div className="recommended-communities">
      {communities.map((community, index) => {
        return (
          <div
            key={index}
            className={`community${index + 1} com-extra`}
            onClick={() => navigate(`/chatroom/community/${community.id}`)}
          >
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
