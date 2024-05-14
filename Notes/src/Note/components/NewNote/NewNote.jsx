import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineFolderOpen } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { PiFolder } from "react-icons/pi";
import "./NewNote.css";
const NewNote = (props) => {
  const navigate = useNavigate();

  const handleCreate = () => {
    if (props.icon === "true") {
      props.setNewFolder(true);
    } else {
      navigate("/note/new");
    }
  };

  let style = {};
  if (props.from === "folder") {
    style = {
      createNote: {
        width: "100%",
        height: "100%",
        marginTop: "5px",
      },
    };
  } else if (props.from === "note") {
    style = {
      createNote: {
        width: "100%",
        height: "70%",
        marginTop: "20px",
      },
    };
  }

  return (
    <div className="createNote" style={style.createNote} onClick={handleCreate}>
      {props.icon === "true" ? (
        <PiFolder style={{ fontSize: "30", color: "rgba(0, 0, 0, 0.8)" }} />
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
