import React, { useState, useMemo } from "react";
import "./Notes.css";
import {
  noteUserAtom,
  archivedNotesAtom,
  deletedNotesAtom,
} from "../../../store/NoteStore/noteStore";
import { authUserAtom } from "../../../store/authAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../../config";
import { PiNotePencilBold } from "react-icons/pi";
import OptionDropdown from "../OptionDropdown/OptionDropdown";
import TopicDropdown from "../TopicDropdown/TopicDropdown";
import ColourDropdown from "../ColourDropdown/ColourDropdown";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ThreeDotsVer from "../../../assets/Icons/ThreeDotsVer.svg";

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
  const [archiveNote, setArchiveNote] = useRecoilState(archivedNotesAtom);
  const [trashNote, setTrashNote] = useRecoilState(deletedNotesAtom);

  const navigate = useNavigate();
  const location = useLocation();

  const trashPath = useMemo(() => {
    return location.pathname.includes("/trash/note");
  }, [location.pathname]);

  const archivePath = useMemo(() => {
    return location.pathname.includes("/archive/note");
  }, [location.pathname]);

  let noteOpt = [
    "Move to Trash",
    "Archive",
    "Add to Topics",
    "Change colour",
    "Add to Folder",
    "Download",
    // "Rename",
  ];

  if (trashPath) {
    noteOpt = ["Delete", "Recover"];
  } else if (archivePath) {
    noteOpt = ["Move to Trash", "Unarchive"];
  }

  const [showOptDropDown, setOptDropDown] = useState(
    Array(cards2.length).fill(false)
  );
  const [showTopicDropDown, setTopicDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(Array(cards2.length).fill(false));
  const [showColourDropDown, setColourDropDown] = useState(false);
  const [isOpenColour, setIsOpenColour] = useState(
    Array(cards2.length).fill(false)
  );

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
      trashPath ? handleDelete() : handleTrash();
    } else if (index === 1) {
      if (archivePath) {
        handleUnarchive();
      } else if (trashPath) {
        handleRecover();
      } else {
        handleArchive();
      }
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

  const handleTrash = async () => {
    const token = localStorage.getItem("token");

    const updatedNotes = cards2.filter((note) => note._id !== card._id);
    setCards2(updatedNotes);
    const response = await fetch(`${BASE_URL}/note/deletenote`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser.userId,
        noteIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards2.length).fill(false));
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const updatedNotes = trashNote.filter((note) => note._id !== card._id);
    setTrashNote(updatedNotes);
    const response = await fetch(`${BASE_URL}/note/deletenotepermanently`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser.userId,
        noteIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards2.length).fill(false));
  };

  const handleArchive = async () => {
    const token = localStorage.getItem("token");

    const updatedNotes = cards2.filter((note) => note._id !== card._id);
    setCards2(updatedNotes);
    const response = await fetch(`${BASE_URL}/note/archivenote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser.userId,
        noteIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards2.length).fill(false));
  };

  const handleUnarchive = async () => {
    const token = localStorage.getItem("token");

    const unarchiveNote = archiveNote.find((note) => note._id === card._id);
    setCards2((prev) => [unarchiveNote, ...prev]);
    const updatedNotes = archiveNote.filter((note) => note._id !== card._id);
    setArchiveNote(updatedNotes);
    const response = await fetch(`${BASE_URL}/note/unarchivenote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser.userId,
        noteIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards2.length).fill(false));
  };

  const handleRecover = async () => {
    const token = localStorage.getItem("token");

    const recoverNote = trashNote.find((note) => note._id === card._id);
    setCards2((prev) => [recoverNote, ...prev]);
    const updatedNotes = trashNote.filter((note) => note._id !== card._id);
    setTrashNote(updatedNotes);
    const response = await fetch(`${BASE_URL}/note/recovernote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser.userId,
        noteIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards2.length).fill(false));
  };

  const handleAdd = (cardsIndex) => {
    console.log("Note");
    setAddToFolder(cardsIndex);
    setOptDropDown(Array(cards2.length).fill(false));
  };

  return (
    <div
      key={index}
      className="card-note"
      style={{
        backgroundColor: card.color,
      }}
      onDoubleClick={() => {
        !trashPath &&
          navigate(`/note/content/${card._id}`, {
            state: {
              content: card.content,
              title: card.title,
            },
          });
      }}
    >
      <div className="sub-card-note-1">
        <div className="card-note-title">
          <h6>{formatDate(card.updated_at)}</h6>
          <form action="">
            <input
              className={`card-note-title-input${index} note-rename`}
              type="text"
              value={card.title}
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
            heading="Note Topic"
            setOptDropDown={setOptDropDown}
            length={cards2.length}
            setIsOpen={setIsOpen}
            setTopicDropDown={setTopicDropDown}
            card={card}
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
