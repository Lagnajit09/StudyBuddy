import React, { useState } from "react";
import "./Notes.css";
import { cards as cards2 } from "../../Notes";
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
  "rgba(255, 255, 255, 1)",
  "rgba(179, 171, 252, 1)",
  "rgba(252, 191, 73, 1)",
  "rgba(57, 184, 212, 1)",
  "rgba(255, 130, 198, 1)",
  "rgba(99, 180, 184, 1)",
  "rgba(217, 217, 217, 1)",
];

const Notes = () => {
  const [showOptDropDown, setOptDropDown] = useState(
    Array(cards2.length).fill(false)
  );
  const [showTopicDropDown, setShowTopicDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(Array(cards2.length).fill(false));

  const [showColourDropDown, setColourDropDown] = useState(false);
  const [isOpenColour, setIsOpenColour] = useState(
    Array(cards2.length).fill(false)
  );
  const [selectedColours, setSelectedColours] = useState(
    Array(cards2.length).fill(null)
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

  const handleColourClick = (index, cardsIndex, colour) => {
    const updatedColourDropDown = Array(cards2.length).fill(false);
    updatedColourDropDown[cardsIndex] = !isOpenColour[cardsIndex];
    setIsOpenColour(updatedColourDropDown);
    setSelectedColours((prevState) => {
      const updatedSelectedColours = [...prevState];
      updatedSelectedColours[cardsIndex] = colour;
      return updatedSelectedColours;
    });
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


  
  return cards2.map((card, index) => (
    <div
      key={index}
      className="card-note"
      style={{
        backgroundColor: selectedColours[index],
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
      {hoveredIndex === index &&
        !isClicked[index] &&
        !selectedColours[index] && (
          <div className="tooltip">
            <span className="tooltip-text">Select</span>
          </div>
        )}
      <div className="sub-card-note-1">
        <div className="card-note-title">
          <h6>{card.date}</h6>
          <h5>{card.noteName}</h5>
        </div>
        <PiNotePencilBold
          style={{
            fontSize: "20",
            color: "rgba(255, 255, 255, 1)",
          }}
        />
      </div>
      <div className="sub-card-note-2">
        <div className="card-note-desc">
          <h5>{card.desc}</h5>
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
          <h6>{card.time}</h6>
        </div>
        <div className="three-dots-ver">
          <img src={ThreeDotsVer} alt="" onClick={() => optDropdown(index)} />
          {showColourDropDown && isOpenColour[index] && (
            <ColourDropdown
              from="note"
              arr={colours}
              handleColourClick={(colour) =>
                handleColourClick(3, index, colour)
              }
            />
          )}
        </div>
      </div>
    </div>
  ));
};

export default Notes;
