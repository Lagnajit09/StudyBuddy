import React, { useState } from "react";
import "./Folders.css";
import { folderUserAtom } from "../../../NoteStore/folderStore";
import { useRecoilValue } from "recoil";
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
  "#79B2D9",
  "#63B4B8",
  "#E78895",
  "#39B8D4",
  "#B3ABFC",
  "#FCBF49",
  "#D9D9D9",
];

const Folders = ({ card, index }) => {
  const cards1 = useRecoilValue(folderUserAtom);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}.${
      month < 10 ? "0" : ""
    }${month}.${year}`;
  }

  // const dateString = cards1.createdAt;
  // const formattedDate = date.toLocaleDateString("en-GB", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  // });

  const [showOptDropDown, setOptDropDown] = useState(
    Array(cards1.length).fill(false)
  );
  const [showTopicDropDown, setTopicDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(Array(cards1.length).fill(false));

  const [showColourDropDown, setColourDropDown] = useState(false);
  const [isOpenColour, setIsOpenColour] = useState(
    Array(cards1.length).fill(false)
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

  const handleColourClick = (index, cardsIndex) => {
    const updatedColourDropDown = Array(cards1.length).fill(false);
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
    const updatedIsClicked = Array(cards1.length).fill(false);
    updatedIsClicked[index] = !isClicked[index];
    setIsClicked(updatedIsClicked);
    setHoveredIndex(null);
  };

  return (
    <div
      key={index}
      className="card-folder"
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
        <div className="arrow-icon-folder">
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

      <div className="card-folder-icons">
        <PiFolder
          style={{
            fontSize: "50",
            color: "rgba(255,255,255,1)",
          }}
        />
        <div className="three-dots-hor" key={card._id}>
          <img src={ThreeDotsHor} alt="" onClick={() => optDropdown(index)} />
          {showOptDropDown[index] &&
            !showTopicDropDown &&
            !showColourDropDown && (
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
              color={card.color}
              index={index}
            />
          )}
        </div>
      </div>
      <div className="card-folder-desc">
        <h5>{card.name}</h5>
        <h6>{formatDate(card.createdAt)}</h6>
      </div>
    </div>
  );
};

export default Folders;
