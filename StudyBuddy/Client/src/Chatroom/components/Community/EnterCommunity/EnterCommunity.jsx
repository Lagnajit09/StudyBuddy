import React from "react";
import "./EnterCommunity.css";
import RecommendedCommunity from "./Recommended/RecommendedCommunity";

const EnterCommunity = () => {
  return (
    <div className="community-first">
      <h1>Welcome to Chat Room</h1>
      <p>
        Not sure where to start? Get started by joining the recommended
        community.
      </p>
      <RecommendedCommunity />
    </div>
  );
};

export default EnterCommunity;
