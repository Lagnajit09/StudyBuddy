import React, { useEffect, useRef } from "react";
import "./ColourDropdown.css";
import { authUserAtom } from "../../../store/authAtom";
import { folderUserAtom } from "../../../store/NoteStore/folderStore";
import { noteUserAtom } from "../../../store/NoteStore/noteStore";
import { useRecoilValue, useRecoilState } from "recoil";
import { BASE_URL } from "../../../config";

const ColourDropdown = (props) => {
  const authUser = useRecoilValue(authUserAtom);
  const [folders, setFolders] = useRecoilState(folderUserAtom);
  const [notes, setNotes] = useRecoilState(noteUserAtom);

  const colourRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colourRef.current && !colourRef.current.contains(event.target)) {
        props.setIsOpenColour(Array(props.length).fill(false));
        props.setColourDropDown(false);
        props.setOptDropDown(Array(props.length).fill(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colourRef]);

  let style = {};
  if (props.from === "folder") {
    style = {
      colourDropdown: {
        height: "23%",
        width: "13vw",
        position: "absolute",
        bottom: "-14%",
        right: "-2%",
      },
    };
  } else if (props.from === "note") {
    style = {
      colourDropdown: {
        position: "absolute",
        bottom: "-8%",
        right: "-2%",
      },
    };
  }

  const updateColor = async (newColor, index) => {
    const token = localStorage.getItem("token");

    if (props.from === "folder") {
      const updatedFolders = [...folders];
      updatedFolders[index] = {
        ...updatedFolders[index],
        color: newColor,
      };
      setFolders(updatedFolders);
      const response = await fetch(`${BASE_URL}/note/updatefolder`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser.userId,
          folderId: folders[index]._id,
          color: newColor,
        }),
      });
      const data = await response.json();
    } else if (props.from === "note") {
      const updatedNotes = [...notes];
      updatedNotes[index] = {
        ...updatedNotes[index],
        color: newColor,
      };
      setNotes(updatedNotes);
      const response = await fetch(`${BASE_URL}/note/updatenote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser.userId,
          noteId: notes[index]._id,
          newcolor: newColor,
        }),
      });
      const data = await response.json();
    }
  };

  return (
    <div
      className="colour-dropdown"
      style={style.colourDropdown}
      ref={colourRef}
    >
      {props.arr.map((colour, index) => {
        return (
          <div
            className="sub-colour-dropdown"
            key={index}
            style={{
              backgroundColor: colour,
              border:
                props.color === colour
                  ? "2px solid #00a9ff"
                  : "1.5px solid #CCCCCC",
            }}
            onClick={() => {
              updateColor(colour, props.index);
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default ColourDropdown;
