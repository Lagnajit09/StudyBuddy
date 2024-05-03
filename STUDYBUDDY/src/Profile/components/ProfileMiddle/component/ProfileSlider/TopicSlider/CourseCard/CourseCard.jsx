import React, { useMemo } from "react";
import "./CourseCard.css";
import { useNavigate } from "react-router-dom";

const CourseCard = (props) => {
  const navigate = useNavigate();

  let style = {};
  if (props.from === "profile") {
    style = {
      img: {
        width: "240px",
        height: "145px",
        overflow: "hidden",
      },

      cardContainer: {
        width: "227px",
        height: "200px",
        paddingBottom: "10px",
      },
    };
  }

  const truncatedCap = props.cap.slice(0, 20);

  const updatedArr = useMemo(() => {
    return props.course.filter((course, index) => index < 8 && course);
  }, [props.course]);

  return (
    <div
      className="profile-cardContainer"
      style={style.cardContainer}
      onClick={() => {
        navigate("/courses/about", {
          state: { course: updatedArr, index: props.index },
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
