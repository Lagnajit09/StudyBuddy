import React, { useEffect, useRef } from "react";
import "./ColourDropdown.css";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { folderUserAtom } from "../../../NoteStore/folderStore";
import { noteUserAtom } from "../../../NoteStore/noteStore";
import { useRecoilValue, useRecoilState } from "recoil";

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
    if (props.from === "folder") {
      const updatedFolders = [...folders];
      updatedFolders[index] = {
        ...updatedFolders[index],
        color: newColor,
      };
      setFolders(updatedFolders);
      const response = await fetch("http://localhost:3000/note/updatefolder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser._id,
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
      const response = await fetch("http://localhost:3000/note/updatenote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser._id,
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
        console.log(props.color, colour);
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
