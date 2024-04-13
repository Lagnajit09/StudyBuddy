import React, { useState } from "react";
import "./TopicDropdown.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";

const TopicDropdown = (props) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = (topic) => {
    setCheckedItems((prevState) => {
      if (prevState.includes(topic)) {
        return prevState.filter((i) => i !== topic);
      } else {
        return [topic];
      }
    });
  };

  const isChecked = (topic) => {
    return checkedItems.includes(topic);
  };

  let style = {};
  if (props.from === "folder") {
    style = {
      topicDropdown: {
        position: "absolute",
        top: "25%",
        zIndex: "3",
      },
    };
  } else if (props.from === "note") {
    style = {
      topicDropdown: {
        position: "absolute",
        top: "34%",
        zIndex: "3",
      },
    };
  }

  return (
    <div className="topic-dropdown" style={style.topicDropdown}>
      <div className="sub-topic-dropdown-1">
        <span id="topic-heading">{props.heading}</span>
        {/* <span id="create-topic">
          <input type="text" placeholder="Create New Topic" />
          <IoMdAddCircleOutline
            style={{ fontSize: "11" }}
          /> 
        </span> */}
      </div>
      <div className="sub-topic-dropdown-2">
        {props.arr.map((topic, index) => {
          return (
            <span
              key={index}
              className="topic-name"
              onClick={() => handleCheck(topic)}
            >
              {!isChecked(topic) ? (
                <MdOutlineCheckBoxOutlineBlank style={{ fontSize: "11" }} />
              ) : (
                <MdOutlineCheckBox style={{ fontSize: "11" }} />
              )}
              {topic}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TopicDropdown;
