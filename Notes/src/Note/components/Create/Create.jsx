import React from "react";
import "./Create.css";

const Create = (props) => {
  return (
    <div className="create-folder-backdrop">
      <div className="create-folder">
        <h2 id="create-folder-heading">New Folder</h2>
        <input type="text" id="create-folder-input" placeholder="Folder Name" />
        <div className="create-folder-buttons">
          <button id="cancel" onClick={() => props.setNewFolder(false)}>
            Cancel
          </button>
          <button id="create">Create</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
