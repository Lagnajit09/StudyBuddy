import React from "react";
import "./ColourDropdown.css";

const ColourDropdown = (props) => {
  let style = {};
  if (props.from === "folder") {
    style = {
      colourDropdown: {
        height: "23%",
        width: "13vw",
        position: "absolute",
        bottom: "-14%",
        right: "-3%",
      },
    };
  } else if (props.from === "note") {
    style = {
      colourDropdown: {
        position: "absolute",
        bottom: "-8%",
        right: "-6%",
      },
    };
  }
  return (
    <div className="colour-dropdown" style={style.colourDropdown}>
      {props.arr.map((colour, index) => {
        return (
          <div
            className="sub-colour-dropdown"
            key={index}
            style={{ backgroundColor: colour }}
            onClick={() => props.handleColourClick(colour)}
          ></div>
        );
      })}
    </div>
  );
};

export default ColourDropdown;
