import React, { useState, useRef, useEffect } from "react";
import "./Notes.css";
import { noteUserAtom } from "../../../NoteStore/noteStore";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
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
  "Add to Folder",
  "Download",
  // "Rename",
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

const Notes = ({ card, index, setAddToFolder }) => {
  const [cards2, setCards2] = useRecoilState(noteUserAtom);
  const authUser = useRecoilValue(authUserAtom);

  const navigate = useNavigate();

  const [showOptDropDown, setOptDropDown] = useState(
    Array(cards2.length).fill(false)
  );
  const [showTopicDropDown, setTopicDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(Array(cards2.length).fill(false));

  const [showColourDropDown, setColourDropDown] = useState(false);
  const [isOpenColour, setIsOpenColour] = useState(
    Array(cards2.length).fill(false)
  );

  // const [rename, setRename] = useState(card.title);

  // const renameRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (renameRef.current && !renameRef.current.contains(event.target)) {
  //       handleRenameNote();
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [renameRef]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
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

  // const [isClicked, setIsClicked] = useState(Array(cards2.length).fill(false));
  // const [hoveredIndex, setHoveredIndex] = useState(null);

  const optDropdown = (index) => {
    const updatedOptDropDown = Array(cards2.length).fill(false);
    updatedOptDropDown[index] = !showOptDropDown[index];
    setOptDropDown(updatedOptDropDown);
  };

  const handleTopicClick = (index, cardsIndex) => {
    const updatedTopicDropDown = Array(cards2.length).fill(false);
    updatedTopicDropDown[cardsIndex] = !isOpen[cardsIndex];
    setIsOpen(updatedTopicDropDown);
    index === 2 ? setTopicDropDown(true) : setTopicDropDown(false);
  };

  const handleColourClick = (index, cardsIndex) => {
    const updatedColourDropDown = Array(cards2.length).fill(false);
    updatedColourDropDown[cardsIndex] = !isOpenColour[cardsIndex];
    setIsOpenColour(updatedColourDropDown);
    index === 3 ? setColourDropDown(true) : setColourDropDown(false);
  };

  const handleOptClick = (index, cardsIndex) => {
    if (index === 0) {
      handleDelete();
    } else if (index === 2) {
      handleTopicClick(index, cardsIndex);
    } else if (index === 3) {
      handleColourClick(index, cardsIndex);
    } else if (index === 4) {
      handleAdd(cardsIndex);
    }
    // else if (index === 6) {
    //   handleRename();
    // }
  };

  const handleDelete = async () => {
    const updatedNotes = cards2.filter((note) => note._id !== card._id);
    setCards2(updatedNotes);
    const response = await fetch("http://localhost:3000/note/deletenote", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser._id,
        noteIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards2.length).fill(false));
  };

  const handleAdd = (cardsIndex) => {
    setAddToFolder(cardsIndex);
    setOptDropDown(Array(cards2.length).fill(false));
  };

  // const handleRename = async () => {
  //   const rename = document.querySelector(`.card-note-title-input${index}`);
  //   rename.disabled = false;
  //   rename.focus();
  //   setOptDropDown(Array(cards2.length).fill(false));
  // };

  // // const handleFolderClick = (index) => {
  // //   const updatedIsClicked = Array(cards2.length).fill(false);
  // //   updatedIsClicked[index] = !isClicked[index];
  // //   setIsClicked(updatedIsClicked);
  // //   setHoveredIndex(null);
  // // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   handleRenameNote();
  // };

  // const handleRenameNote = async () => {
  //   const rename = document.querySelector(`.card-note-title-input${index}`);
  //   rename.disabled = true;
  //   const updatedNotes = [...cards2];
  //   updatedNotes[index] = {
  //     ...updatedNotes[index],
  //     name: rename.value,
  //   };
  //   setCards2(updatedNotes);
  //   const response = await fetch("http://localhost:3000/note/updatenote", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: authUser._id,
  //       noteId: card._id,
  //       newtitle: rename.value,
  //     }),
  //   });
  //   const data = await response.json();
  // };

  return (
    <div
      key={index}
      className="card-note"
      style={{
        backgroundColor: card.color,
        // border: isClicked[index]
        //   ? "1.5px solid rgba(0,0,0,1)"
        //   : "1px solid rgba(0, 0, 0, 0.1)",
      }}
      // onClick={() => handleFolderClick(index)}
      // onMouseOver={() => setHoveredIndex(index)}
      // onMouseOut={() => setHoveredIndex(null)}
      onDoubleClick={() => {
        navigate(`/note/content/${card._id}`, {
          state: {
            content: card.content,
            title: card.title,
          },
        });
      }}
      // ref={renameRef}
    >
      {/* {isClicked[index] && (
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
      )} */}
      <div className="sub-card-note-1">
        <div className="card-note-title">
          <h6>{formatDate(card.updated_at)}</h6>
          <form action="">
            <input
              className={`card-note-title-input${index} note-rename`}
              type="text"
              value={card.title}
              // onChange={(e) => setRename(e.target.value)}
              disabled
            />
          </form>
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
            {card.contentText.length > 195
              ? `${card.contentText.slice(0, 197)}...`
              : card.contentText}
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
              setOptDropDown={setOptDropDown}
              length={cards2.length}
            />
          )}
        {showTopicDropDown && isOpen[index] && (
          <TopicDropdown
            from="note"
            arr={topicDropdown}
            heading="Note Topic"
            setOptDropDown={setOptDropDown}
            length={cards2.length}
            setIsOpen={setIsOpen}
            setTopicDropDown={setTopicDropDown}
          />
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
              setOptDropDown={setOptDropDown}
              length={cards2.length}
              setIsOpenColour={setIsOpenColour}
              setColourDropDown={setColourDropDown}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
