import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="top-cardContainer" style={{background: props.cap_bcolor}}>
      <img src={props.img} alt="Course-pic"/>
      <div id="top-cardName" style={{ backgroundColor: props.cap_color }}>
        {props.c_name}
      </div>
      <div className="top-cardDescription">
        <span id="top-cap">{props.cap}</span>
        <span id="top-dest">{props.c_dest}</span>
      </div>
    </div>
  );
};

export default Card;
