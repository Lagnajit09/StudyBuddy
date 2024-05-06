import React, { useState, useMemo } from "react";
import "./Folders.css";
import {
  folderUserAtom,
  archivedFoldersAtom,
  deletedFoldersAtom,
} from "../../../NoteStore/folderStore";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import ThreeDotsHor from "../../../assets/Icons/ThreeDotsHor.svg";
import OptionDropdown from "../OptionDropdown/OptionDropdown";
import TopicDropdown from "../TopicDropdown/TopicDropdown";
import ColourDropdown from "../ColourDropdown/ColourDropdown";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiFolder } from "react-icons/pi";

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
  const [cards1, setCards1] = useRecoilState(folderUserAtom);
  const authUser = useRecoilValue(authUserAtom);
  const [archiveFolder, setArchiveFolder] = useRecoilState(archivedFoldersAtom);
  const [trashFolder, setTrashFolder] = useRecoilState(deletedFoldersAtom);

  const navigate = useNavigate();
  const location = useLocation();
  const trashPath = useMemo(() => {
    return location.pathname.includes("/trash/folder");
  }, [location.pathname]);

  const archivePath = useMemo(() => {
    return location.pathname.includes("/archive/folder");
  }, [location.pathname]);

  let folderOpt = [
    "Move to Trash",
    "Archive",
    "Add to Topics",
    "Change colour",
    // "Rename",
  ];

  if (trashPath) {
    folderOpt = ["Delete", "Recover"];
  } else if (archivePath) {
    folderOpt = ["Move to Trash", "Unarchive"];
  }

  // const [rename, setRename] = useState(card.name);

  // const renameRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (renameRef.current && !renameRef.current.contains(event.target)) {
  //       handleRenameFolder();
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

  const [showOptDropDown, setOptDropDown] = useState(
    Array(cards1.length).fill(false)
  );
  const [showTopicDropDown, setTopicDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(Array(cards1.length).fill(false));

  const [showColourDropDown, setColourDropDown] = useState(false);
  const [isOpenColour, setIsOpenColour] = useState(
    Array(cards1.length).fill(false)
  );

  // const [isClicked, setIsClicked] = useState(Array(cards1.length).fill(false));
  // const [hoveredIndex, setHoveredIndex] = useState(null);

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
    }
    // else if (index === 4) {
    //   handleRename();
    // }
  };

  const handleTrash = async () => {
    const updatedFolders = cards1.filter((folder) => folder._id !== card._id);
    setCards1(updatedFolders);
    const response = await fetch("http://localhost:3000/note/deletefolder", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser._id,
        folderIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards1.length).fill(false));
  };

  const handleDelete = async () => {
    const updatedFolders = trashFolder.filter(
      (folder) => folder._id !== card._id
    );
    setTrashFolder(updatedFolders);
    const response = await fetch(
      "http://localhost:3000/note/deletefolderpermanently",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser._id,
          folderIds: [card._id],
        }),
      }
    );
    const data = await response.json();
    setOptDropDown(Array(cards1.length).fill(false));
  };

  const handleArchive = async () => {
    const updatedFolders = cards1.filter((folder) => folder._id !== card._id);
    setCards1(updatedFolders);
    const response = await fetch("http://localhost:3000/note/archivefolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser._id,
        folderIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards1.length).fill(false));
  };

  const handleUnarchive = async () => {
    const unarchiveFolder = archiveFolder.find(
      (folder) => folder._id === card._id
    );
    setCards1((prev) => [unarchiveFolder, ...prev]);
    const updatedFolders = archiveFolder.filter(
      (folder) => folder._id !== card._id
    );
    setArchiveFolder(updatedFolders);
    const response = await fetch("http://localhost:3000/note/unarchivefolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser._id,
        folderIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards1.length).fill(false));
  };

  const handleRecover = async () => {
    const recoverFolder = trashFolder.find((folder) => folder._id === card._id);
    setCards1((prev) => [recoverFolder, ...prev]);
    const updatedFolders = trashFolder.filter(
      (folder) => folder._id !== card._id
    );
    setTrashFolder(updatedFolders);
    const response = await fetch("http://localhost:3000/note/recoverfolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser._id,
        folderIds: [card._id],
      }),
    });
    const data = await response.json();
    setOptDropDown(Array(cards1.length).fill(false));
  };

  // const handleRename = async () => {
  //   const rename = document.querySelector(`.card-folder-name-input${index}`);
  //   rename.disabled = false;
  //   rename.focus();
  //   setOptDropDown(Array(cards1.length).fill(false));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   handleRenameFolder();
  // };

  // const handleRenameFolder = async () => {
  //   const rename = document.querySelector(`.card-folder-name-input${index}`);
  //   rename.disabled = true;
  //   const updatedFolders = [...cards1];
  //   updatedFolders[index] = {
  //     ...updatedFolders[index],
  //     name: rename.value,
  //   };
  //   setCards1(updatedFolders);
  //   const response = await fetch("http://localhost:3000/note/renamefolder", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: authUser._id,
  //       folderId: card._id,
  //       newname: rename.value,
  //     }),
  //   });
  //   const data = await response.json();
  // };

  // const handleFolderClick = (index) => {
  //   const updatedIsClicked = Array(cards1.length).fill(false);
  //   updatedIsClicked[index] = !isClicked[index];
  //   setIsClicked(updatedIsClicked);
  //   setHoveredIndex(null);
  // };

  return (
    <div
      key={index}
      className="card-folder"
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
        !trashPath && navigate(`/note/${card._id}`);
      }}
      // ref={renameRef}
    >
      {/* {isClicked[index] && (
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
      )} */}

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
                setOptDropDown={setOptDropDown}
                length={cards1.length}
              />
            )}
          {showTopicDropDown && isOpen[index] && (
            <TopicDropdown
              from="folder"
              arr={topicDropdown}
              heading="Folder Topic"
              setOptDropDown={setOptDropDown}
              length={cards1.length}
              setIsOpen={setIsOpen}
              setTopicDropDown={setTopicDropDown}
            />
          )}
          {showColourDropDown && isOpenColour[index] && (
            <ColourDropdown
              from="folder"
              arr={colours}
              color={card.color}
              index={index}
              setOptDropDown={setOptDropDown}
              length={cards1.length}
              setIsOpenColour={setIsOpenColour}
              setColourDropDown={setColourDropDown}
            />
          )}
        </div>
      </div>
      <div className="card-folder-desc">
        <form action="">
          <input
            className={`card-folder-name-input${index} folder-rename`}
            type="text"
            value={card.name}
            // onChange={(e) => setRename(e.target.value)}
            disabled
          />
        </form>
        <h6>{formatDate(card.createdAt)}</h6>
      </div>
    </div>
  );
};

export default Folders;