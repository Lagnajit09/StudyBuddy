import React, { useState } from "react";
import "./Folders.css";
import { cards as cards1 } from "../../Folder";
import ThreeDotsHor from "../../../assets/Icons/ThreeDotsHor.svg";
import OptionDropdown from "../OptionDropdown/OptionDropdown";
import TopicDropdown from "../TopicDropdown/TopicDropdown";
import ColourDropdown from "../ColourDropdown/ColourDropdown";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiFolder } from "react-icons/pi";

const folderOpt = [
  "Delete Folder",
  "Archive",
  "Add to Topics",
  "Change colour",
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
  "rgba(217, 217, 217, 1)",
  "rgba(179, 171, 252, 1)",
  "rgba(252, 191, 73, 1)",
  "rgba(57, 184, 212, 1)",
  "rgba(99, 180, 184, 1)",
  "rgba(121, 178, 217, 1)",
  "rgba(231, 136, 149, 1)",
];

const Folders = () => {
  const [showOptDropDown, setOptDropDown] = useState(
    Array(cards1.length).fill(false)
  );
  const [showTopicDropDown, setTopicDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(Array(cards1.length).fill(false));

  const [showColourDropDown, setColourDropDown] = useState(false);
  const [isOpenColour, setIsOpenColour] = useState(
    Array(cards1.length).fill(false)
  );
  const [selectedColours, setSelectedColours] = useState(
    Array(cards1.length).fill(null)
  );

  const [isClicked, setIsClicked] = useState(Array(cards1.length).fill(false));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const optDropdown = (index) => {
    const updatedDropDown = Array(cards1.length).fill(false);
    updatedDropDown[index] = !showOptDropDown[index];
    setOptDropDown(updatedDropDown);
  };

  const handleTopicClick = (index, cardsIndex) => {
    const updatedTopicDropDown = Array(cards1.length).fill(false);
    updatedTopicDropDown[cardsIndex] = !isOpen[cardsIndex];
    setIsOpen(updatedTopicDropDown);
    index === 2 ? setTopicDropDown(true) : setTopicDropDown(false);
  };

  const handleColourClick = (index, cardsIndex, colour) => {
    const updatedColourDropDown = Array(cards1.length).fill(false);
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
    const updatedIsClicked = Array(cards1.length).fill(false);
    updatedIsClicked[index] = !isClicked[index];
    setIsClicked(updatedIsClicked);
    setHoveredIndex(null);
  };

  return cards1.map((card, index) => (
    <div
      key={index}
      className="card-folder"
      style={{
        backgroundColor: selectedColours[index],
        border:
          isClicked[index] 
            ? "1.5px solid rgba(0,0,0,1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
      }}
      onClick={() => handleFolderClick(index)}
      onMouseOver={() => setHoveredIndex(index)}
      onMouseOut={() => setHoveredIndex(null)}
    >
      {isClicked[index] && (
        <div className="arrow-icon-folder">
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

      <div className="card-folder-icons">
        {/* <MdOutlineFolderOpen
          style={{
            fontSize: "50",
            color: folderIconColour(index),
          }}
        /> */}
        <PiFolder
          style={{
            fontSize: "50",
            color: "rgba(255,255,255,1)",
          }}
        />
        <div className="three-dots-hor" key={card.id}>
          <img src={ThreeDotsHor} alt="" onClick={() => optDropdown(index)} />
          {showOptDropDown[index] && !showTopicDropDown && !showColourDropDown && (
            <OptionDropdown
              from="folder"
              arr={folderOpt}
              handleOptClick={handleOptClick}
              cardsIndex={index}
            />
          )}
          {showTopicDropDown && isOpen[index] && (
            <TopicDropdown
              from="folder"
              arr={topicDropdown}
              heading="Folder Topic"
            />
          )}
          {showColourDropDown && isOpenColour[index] && (
            <ColourDropdown
              from="folder"
              arr={colours}
              handleColourClick={(colour) =>
                handleColourClick(3, index, colour)
              }
            />
          )}
        </div>
      </div>
      <div className="card-folder-desc">
        <h5>{card.folderName}</h5>
        <h6>{card.date}</h6>
      </div>
    </div>
  ));
};

export default Folders;
