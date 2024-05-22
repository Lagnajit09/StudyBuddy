import React, { useState, useEffect, useRef } from "react";
import "./SelectFolder.css";
import { PiFolder } from "react-icons/pi";
import { authUserAtom } from "../../../store/authAtom";
import { folderUserAtom } from "../../../store/NoteStore/folderStore";
import { noteUserAtom } from "../../../store/NoteStore/noteStore";
import { useRecoilState, useRecoilValue } from "recoil";
import { BASE_URL } from "../../../config";

const SelectFolder = (props) => {
  console.log("Folder");
  const authUser = useRecoilValue(authUserAtom);
  const [folderUser, setFolderUser] = useRecoilState(folderUserAtom);
  const [noteUser, setNoteUser] = useRecoilState(noteUserAtom);
  const [folderDetails, setFolderDetails] = useState({});
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(null);

  const backdropRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (backdropRef.current && !backdropRef.current.contains(event.target)) {
        props.setAddToFolder(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [backdropRef]);

  const handleCancelClick = () => {
    props.setAddToFolder(-1);
  };

  const moveToFolder = (id, folderIndex) => {
    setFolderDetails({ id, folderIndex });
    setSelectedFolderIndex(folderIndex);
  };

  const handleMove = async () => {
    const token = localStorage.getItem("token");

    const { id, folderIndex } = folderDetails;
    const noteIndex = props.addToFolder;
    const response = await fetch(`${BASE_URL}/note/movetofolder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser.userId,
        noteId: noteUser[noteIndex]._id,
        folderId: id,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      const updatedFolder = {
        ...folderUser[folderIndex], // Copy the existing folder object
        notes: [noteUser[noteIndex]._id, ...folderUser[folderIndex].notes], // Add the new noteId to the notes array
      };

      // Replace the old folder object with the updated one in the folders array
      const updatedFolders = [
        updatedFolder,
        ...folderUser.slice(0, folderIndex),
        ...folderUser.slice(folderIndex + 1),
      ];
      // Update the state with the new folders array
      setFolderUser(updatedFolders);

      const updatedNote = {
        ...noteUser[noteIndex], // Copy the existing folder object
        folder_id: id, // Add the new noteId to the notes array
      };

      // Replace the old folder object with the updated one in the folders array
      const updatedNotes = [
        updatedNote,
        ...noteUser.slice(0, noteIndex),
        ...noteUser.slice(noteIndex + 1),
      ];
      // Update the state with the new folders array
      setNoteUser(updatedNotes);
    }
    props.setAddToFolder(-1);
    props.setMove(true);
    setTimeout(() => {
      props.setMove(false);
    }, 2000);
  };

  return (
    <div className="select-folder-backdrop">
      <div className="select-folder" ref={backdropRef}>
        <h2>Move {noteUser[props.addToFolder].title}</h2>
        <h3>Select Folder</h3>
        <div className="select-folder-dropdown">
          {folderUser.map((folder, index) => {
            return (
              <span
                className={`select-dropdown-content ${
                  selectedFolderIndex === index ? "selected" : ""
                }`}
                key={index}
                onClick={() => {
                  moveToFolder(folder._id, index);
                }}
              >
                <PiFolder
                  style={{
                    fontSize: "20",
                    color: "rgba(0, 0, 0, 0.8)",
                  }}
                />
                {folder.name}
              </span>
            );
          })}
        </div>
        <div className="select-folder-buttons">
          <button id="cancel" onClick={handleCancelClick}>
            Cancel
          </button>
          <button id="move" onClick={handleMove}>
            Move
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectFolder;
