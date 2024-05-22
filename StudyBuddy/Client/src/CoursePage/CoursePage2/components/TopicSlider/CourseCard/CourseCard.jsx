import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

const CourseCard = (props) => {
  const navigate = useNavigate();
  let style = {};
  if (props.from === "profile") {
    style = {
      img: {
        width: "246px",
        height: "150px",
      },

      cardContainer: {
        width: "246px",
        height: "222px",
      },
    };
  }

  const truncatedCap = props.cap.slice(0, 25);

  return (
    <div
      className="cardContainer"
      style={style.cardContainer}
      onClick={() => {
        navigate("/courses/about", {
          state: { course: props.course, index: props.index },
        });
      }}
    >
      <img src={props.img} alt="Course-pic" style={style.img} />
      <div id="cardName" style={{ backgroundColor: props.cap_color }}>
        {props.c_name}
      </div>
      <div className="cardDescription">
        <span id="cap">
          {props.cap.length >= 25 ? `${truncatedCap}...` : props.cap}
        </span>
        <span id="dest">{props.c_dest}</span>
      </div>
    </div>
  );
};

export default CourseCard;
