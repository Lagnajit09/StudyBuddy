import React from "react";
import "./Requirements.css";

function formatText(text) {
  text = text.replace(/\*/g, "");
  return text;
}

function Requirements({ requirements }) {
  return (
    <div className="requirements">
      <span className="requirements-span1">Requirements</span>
      <ul className="requirements-list">
        {requirements.split("\n").map((item, index) => {
          return <li key={index}>{formatText(item)}</li>;
        })}
      </ul>
    </div>
  );
}

export default Requirements;
