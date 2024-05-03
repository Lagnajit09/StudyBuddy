import React, { useMemo } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  const truncatedCap = props.cap.slice(0, 20);

  const updatedArr = useMemo(() => {
    return props.course.filter((course, index) => index < 8 && course);
  }, [props.course]);

  return (
    <div
      className="top-cardContainer"
      style={{ background: props.cap_bcolor }}
      onClick={() => {
        navigate("/courses/about", {
          state: { course: updatedArr, index: props.index },
        });
      }}
    >
      <img src={props.img} alt="Course-pic" />
      <div id="top-cardName" style={{ backgroundColor: props.cap_color }}>
        {props.c_name}
      </div>
      <div className="top-cardDescription">
        <span id="top-cap">
          {props.cap.length >= 25 ? `${truncatedCap}...` : props.cap}
        </span>
        <span id="top-dest">{props.c_dest}</span>
      </div>
    </div>
  );
};

export default Card;
