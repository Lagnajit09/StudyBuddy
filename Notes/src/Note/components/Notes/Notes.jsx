import React, { useState } from "react";
import "./Notes.css";
import { noteUserAtom } from "../../../NoteStore/noteStore";
import { useRecoilValue } from "recoil";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { PiNotePencilBold } from "react-icons/pi";
import ThreeDotsVer from "../../../assets/Icons/ThreeDotsVer.svg";
import OptionDropdown from "../OptionDropdown/OptionDropdown";
import TopicDropdown from "../TopicDropdown/TopicDropdown";
import ColourDropdown from "../ColourDropdown/ColourDropdown";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiFolder } from "react-icons/pi";

const noteOpt = [
  "Delete Note",
  "Archive",
  "Add to Topics",
  "Change colour",
  "Make a copy",
  "Download",
];

const topicDropdown = [
  "Biology",
  "Physics",
  "Chemistry",
  "IT and Software",
  "Mathematics",
  "Cloud Computing",
];

const colours = [
  "#79B2D9",
  "#63B4B8",
  "#E78895",
  "#39B8D4",
  "#B3ABFC",
  "#FCBF49",
  "#D9D9D9",
];

const Notes = ({ card, index }) => {
  const cards2 = useRecoilValue(noteUserAtom);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}.${
      month < 10 ? "0" : ""
    }${month}.${year}`;
  }

  function formatDayTime(dateString) {
    const date = new Date(dateString);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return `${date.toLocaleString("en-US", options)}, ${date.toLocaleDateString(
      "en-US",
      { weekday: "long" }
    )}`;
  }

  const [showOptDropDown, setOptDropDown] = useState(
    Array(cards2.length).fill(false)
  );
  const [showTopicDropDown, setShowTopicDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(Array(cards2.length).fill(false));

  const [showColourDropDown, setColourDropDown] = useState(false);
  const [isOpenColour, setIsOpenColour] = useState(
    Array(cards2.length).fill(false)
  );

  const [isClicked, setIsClicked] = useState(Array(cards2.length).fill(false));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const optDropdown = (index) => {
    const updatedOptDropDown = Array(cards2.length).fill(false);
    updatedOptDropDown[index] = !showOptDropDown[index];
    setOptDropDown(updatedOptDropDown);
  };

  const handleTopicClick = (index, cardsIndex) => {
    const updatedTopicDropDown = Array(cards2.length).fill(false);
    updatedTopicDropDown[cardsIndex] = !isOpen[cardsIndex];
    setIsOpen(updatedTopicDropDown);
    index === 2 ? setShowTopicDropDown(true) : setShowTopicDropDown(false);
  };

  const handleColourClick = (index, cardsIndex) => {
    const updatedColourDropDown = Array(cards2.length).fill(false);
    updatedColourDropDown[cardsIndex] = !isOpenColour[cardsIndex];
    setIsOpenColour(updatedColourDropDown);
    index === 3 ? setColourDropDown(true) : setColourDropDown(false);
  };

  const handleOptClick = (index, cardsIndex) => {
    if (index === 2) {
      handleTopicClick(index, cardsIndex);
    } else if (index === 3) {
      handleColourClick(index, cardsIndex);
    }
  };

  const handleFolderClick = (index) => {
    const updatedIsClicked = Array(cards2.length).fill(false);
    updatedIsClicked[index] = !isClicked[index];
    setIsClicked(updatedIsClicked);
    setHoveredIndex(null);
  };

  return (
    <div
      key={index}
      className="card-note"
      style={{
        backgroundColor: card.color,
        border: isClicked[index]
          ? "1.5px solid rgba(0,0,0,1)"
          : "1px solid rgba(0, 0, 0, 0.1)",
      }}
      onClick={() => handleFolderClick(index)}
      onMouseOver={() => setHoveredIndex(index)}
      onMouseOut={() => setHoveredIndex(null)}
    >
      {isClicked[index] && (
        <div className="arrow-icon-note">
          <IoIosCheckmarkCircle
            style={{ fontSize: "27", color: "rgba(101, 203, 255, 1)" }}
          />
        </div>
      )}
      {hoveredIndex === index && !isClicked[index] && (
        <div className="tooltip">
          <span className="tooltip-text">Select</span>
        </div>
      )}
      <div className="sub-card-note-1">
        <div className="card-note-title">
          <h6>{formatDate(card.updated_at)}</h6>
          <h5>{card.title}</h5>
        </div>
        <PiNotePencilBold
          style={{
            fontSize: "25",
            color: "rgba(255, 255, 255, 1)",
          }}
        />
      </div>
      <div className="sub-card-note-2">
        <div className="card-note-desc">
          <h5>
            {card.content.length > 195
              ? `${card.content.slice(0, 197)}...`
              : card.content}
          </h5>
        </div>
        {showOptDropDown[index] &&
          !showTopicDropDown &&
          !showColourDropDown && (
            <OptionDropdown
              from="note"
              arr={noteOpt}
              handleOptClick={handleOptClick}
              cardsIndex={index}
            />
          )}
        {showTopicDropDown && isOpen[index] && (
          <TopicDropdown from="note" arr={topicDropdown} heading="Note Topic" />
        )}
      </div>
      <div className="sub-card-note-3">
        <div className="card-note-clock">
          <AccessTimeRoundedIcon style={{ fontSize: "20" }} />
          <h6>{formatDayTime(card.updated_at)}</h6>
        </div>
        <div className="three-dots-ver">
          <img src={ThreeDotsVer} alt="" onClick={() => optDropdown(index)} />
          {showColourDropDown && isOpenColour[index] && (
            <ColourDropdown
              from="note"
              arr={colours}
              color={card.color}
              index={index}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
