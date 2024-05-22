import React from "react";
import "./CourseCard.css";

const CourseCard = (props) => {
  let style = {};
  if (props.from === "profile") {
    style = {
      img: {
        width: "226px",
        height: "192px",
      },

      cardContainer: {
        width: "227px",
        height: "200px", 
        paddingBottom: "10px"       
      },
    };
  }

  return (
    <div className="cardContainer" style={style.cardContainer}>
      <img src={props.img} alt="Course-pic" style={style.img} />
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
