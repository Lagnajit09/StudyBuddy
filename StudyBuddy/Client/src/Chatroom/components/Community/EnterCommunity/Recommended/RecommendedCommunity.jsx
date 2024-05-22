import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import "./RecommendedCommunity.css";
import { useNavigate } from "react-router-dom";

const communities = [
  {
    id: "6643bb927d750cf9737806a6",
    name: "Developers Villa",
    color: "#A197FC",
  },
  {
    id: "6643bc877d750cf9737806df",
    name: "Physics Why?",
    color: "#63B4B8",
  },
  {
    id: "664438bed6206b837e551fb4",
    name: "Chemical Lords",
    color: "#FFD28F",
  },
  {
    id: "66443884d6206b837e551fa6",
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
