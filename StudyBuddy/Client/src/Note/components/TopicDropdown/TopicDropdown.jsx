import React, { useState, useRef, useEffect, useCallback } from "react";
import "./TopicDropdown.css";
import { authUserAtom } from "../../../store/authAtom";
import { topicAtom } from "../../../store/NoteStore/Topic";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { useRecoilValue, useRecoilState } from "recoil";
import { BASE_URL } from "../../../config";

const TopicDropdown = (props) => {
  const topicRef = useRef(null);
  const authUser = useRecoilValue(authUserAtom);
  const [topicDropdown, setTopicDropdown] = useRecoilState(topicAtom);
  const [topicID, setTopicID] = useState(props.card.topic_id);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (topicRef.current && !topicRef.current.contains(event.target)) {
        props.setIsOpen(Array(props.length).fill(false));
        props.setTopicDropDown(false);
        props.setOptDropDown(Array(props.length).fill(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [topicRef]);

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

  const handleAddToTopic = async (topic, index) => {
    const token = localStorage.getItem("token");

    let response;
    if (props.from === "folder") {
      response = await fetch(`${BASE_URL}/note/addtotopic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser.userId,
          folderId: props.card._id,
          topicId: topic,
        }),
      });
    } else if (props.from === "note") {
      response = await fetch(`${BASE_URL}/note/movetotopic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser.userId,
          noteId: props.card._id,
          topicId: topic,
        }),
      });
    }

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      let updatedTopic = topicDropdown[index];
      let newArray = [];
      if (props.from === "folder") {
        newArray = [...updatedTopic.folders, props.card._id];
        updatedTopic = { ...updatedTopic, folders: newArray };
      } else if (props.from === "note") {
        newArray = [...updatedTopic.notes, props.card._id];
        updatedTopic = { ...updatedTopic, notes: newArray };
      }
      let newTopicDropdown = [...topicDropdown];
      newTopicDropdown[index] = updatedTopic;
      setTopicDropdown(newTopicDropdown);
      setTopicID(topic);
    }
  };

  // const isChecked = useCallback(
  //   (index) => {
  //     if (props.from === "folder") {
  //       return topicDropdown[index].folders.includes(props.card._id);
  //     } else if (props.from === "note") {
  //       return topicDropdown[index].notes.includes(props.card._id);
  //     }
  //   },
  //   [topicDropdown]
  // );

  return (
    <div className="topic-dropdown" style={style.topicDropdown} ref={topicRef}>
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
        {topicDropdown.map((topic, index) => {
          return (
            <span
              key={index}
              className="topic-name"
              onClick={() => handleAddToTopic(topic._id, index)}
            >
              {topicID !== topic._id ? (
                <MdOutlineCheckBoxOutlineBlank style={{ fontSize: "11" }} />
              ) : (
                <MdOutlineCheckBox style={{ fontSize: "11" }} />
              )}
              {topic.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TopicDropdown;
