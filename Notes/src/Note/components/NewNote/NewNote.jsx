import React from "react";
import { MdOutlineFolderOpen } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import "./NewNote.css";
const NewNote = (props) => {
  let style = {};
  if (props.from === "folder") {
    style = {
      createNote: {
        width: "100%",
        height: "100%",  
      },
    };
  }

  return (
    <div className="createNote" style={style.createNote}>
      {props.icon === "true" ? (
        <MdOutlineFolderOpen
          style={{ fontSize: "30", color: "rgba(0, 0, 0, 0.8)" }}
        />
      ) : (
        <PiNotePencilBold
          style={{ fontSize: "30", color: "rgba(0, 0, 0, 0.8)" }}
        />
      )}
      <span>{props.caption}</span>
    </div>
  );
};

export default NewNote;
