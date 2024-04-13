import React, { useState } from "react";
import "./NoteRight.css";
import CreateNote from "../CreateNote/CreateNote";
import NoteSlider from "../NoteSlider/NoteSlider";
import Folders from "../Folders/Folders";
import Create from "../Create/Create";

const NoteRight = () => {
  const [newFolder, setNewFolder] = useState(false);

  return (
    <div className="noteRight">
      <CreateNote
        heading="Recent Folders"
        icon="true"
        caption="New Folder"
        setNewFolder={setNewFolder}
      />
      <CreateNote heading="Recent Notes" icon="false" caption="New Note" />
      {newFolder && <Create setNewFolder={setNewFolder} />}

      {/* <NoteSlider heading="Recent Folder" useFolderCards="true" />
      <NoteSlider heading="Recent Note" useFolderCards="false" /> */}
    </div>
  );
};

export default NoteRight;
