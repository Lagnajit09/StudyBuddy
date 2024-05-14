import React from "react";
import "./NoteRight.css";
import NoteSlider from "../NoteSlider/NoteSlider";

const NoteRight = () => {
  return (
    <div className="noteRight">
      {/* <CreateNote heading="Recent Folders" icon="true" caption="New Folder" />
      <CreateNote heading="Recent Notes" icon="false" caption="New Note" /> */}
      <NoteSlider heading="Recent Folder" useFolderCards="true" />
      <NoteSlider heading="Recent Note" useFolderCards="false" />
    </div>
  );
};

export default NoteRight;
