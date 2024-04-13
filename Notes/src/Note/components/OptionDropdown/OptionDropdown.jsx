import React from "react";
import "./OptionDropdown.css";

const OptionDropdown = (props) => {
  let style = {};
  if (props.from === "folder") {
    style = {
      optDropdown: {
        width: "43.5%",
        position: "absolute",
        top: "25%",
        zIndex: "3",
      },
    };
  } else if (props.from === "note") {
    style = {
      optDropdown: {
        width: "43.5%",
        position: "absolute",
        top: "27.5%",
        zIndex: "3",
      },
    };
  }

  
  return (
    <div className="opt-dropdown" style={style.optDropdown}>
      {props.arr.map((opt, index) => {
        return (
          <h6
            key={index}
            className="sub-opt-dropdown"
            onClick={() => props.handleOptClick(index, props.cardsIndex)}
          >
            {opt}
          </h6>
        );
      })}
    </div>
  );
};

export default OptionDropdown;
