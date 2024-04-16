import React from "react";
import "./AllNotes.css";
import Notes from "../Notes/Notes";

const AllNotes = (props) => {

  return (
    <div className="all-notes">
      {props.noteUser?.map((card, index) => (
        <div className="note">
          <Notes card={card} index={index} />
        </div>
      ))}
    </div>
  );
};

export default AllNotes;
