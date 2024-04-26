import React from "react";
import "./TopicItem.css";

const TopicItem = (props) => {
  return (
    <>
      <div className="topic" onClick={props.onClick}>
        <div className="topic-img">
          <figure>
            <img src={props.img} alt="Physics" />
          </figure>
        </div>
        <div className="topic-text">{props.text}</div>
      </div>
    </>
  );
};

export default TopicItem;
