import React from "react";
import "./CreateNote.css";
import NewNote from "../NewNote/NewNote";

const CreateNote = (props) => {
  return (
    <div className="noteHeading">
      <span>{props.heading}</span>
      <NewNote icon="true" caption={props.caption} />
    </div>
  );
};

export default CreateNote;
