import React, { useEffect, useRef } from "react";
import "./OptionDropdown.css";

const OptionDropdown = (props) => {
  const optRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optRef.current && !optRef.current.contains(event.target)) {
        props.setOptDropDown(Array(props.length).fill(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optRef]);

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
        bottom: "20%",
        // top:"18%",
        right: "10%",
        zIndex: "3",
      },
    };
  }

  return (
    <div className="opt-dropdown" style={style.optDropdown} ref={optRef}>
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
