import React from "react";
import "./CourseCard.css";

const CourseCard = (props) => {
  return (
    <div className="cardContainer">
      <img src={props.img} alt="Course-pic" />
      <div id="cardName" style={{ backgroundColor: props.cap_color }}>
        {props.c_name}
      </div>
      <div className="cardDescription">
        <span id="cap">{props.cap}</span>
        <span id="dest">{props.c_dest}</span>
      </div>
    </div>
  );
};

export default CourseCard;
