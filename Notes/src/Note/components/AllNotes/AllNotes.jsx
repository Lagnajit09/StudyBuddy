import React from "react";
import "./AllNotes.css";
import { noteUserAtom } from "../../../NoteStore/noteStore";
import { useRecoilValue } from "recoil";
import Notes from "../Notes/Notes";

const AllNotes = () => {
  const notes = useRecoilValue(noteUserAtom);

  return (
    <div className="all-notes">
      {notes.map((card, index) => (
        <div className="note">
          <Notes card={card} index={index} />
        </div>
      ))}
    </div>
  );
};

export default AllNotes;
