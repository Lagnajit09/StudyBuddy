import React from "react";
import "./CreateNote.css";
import NewNote from "../NewNote/NewNote";

const CreateNote = (props) => {
  let style = {};
  if (props.icon === "false") {
    style = {
      noteHeading: {
        height: "60%",
        marginTop: "30px",
      },
    };
  }

  return (
    <div className="noteHeading" style={style.noteHeading}>
      <span>{props.heading}</span>
      <NewNote
        icon={props.icon}
        caption={props.caption}
        setNewFolder={props.setNewFolder}
      />
    </div>
  );
};

export default CreateNote;
