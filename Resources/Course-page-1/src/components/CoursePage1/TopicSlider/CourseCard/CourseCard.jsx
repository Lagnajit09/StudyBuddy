import React from "react";
import "./CourseCard.css";
import { Link } from "react-router-dom";

const CourseCard = (props) => {
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
    <Link to={props.link} style={{ textDecoration: "none" }}>
      <div className="cardContainer" style={style.cardContainer}>
        <img src={props.img} alt="Course-pic" style={style.img} />
        <div id="cardName" style={{ backgroundColor: props.cap_color }}>
          {props.c_name}
        </div>
        <div className="cardDescription">
          <span id="cap">{`${truncatedCap}...`}</span>
          <span id="dest">{props.c_dest}</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
