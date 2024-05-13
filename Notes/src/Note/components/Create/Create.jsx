import React, { useState, useEffect, useRef } from "react";
import "./Create.css";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { folderUserAtom } from "../../../NoteStore/folderStore";
import { useRecoilValue, useRecoilState } from "recoil";

const Create = (props) => {
  const [folderName, setFolderName] = useState("");
  const authUser = useRecoilValue(authUserAtom);
  const [folderUser, setFolderUser] = useRecoilState(folderUserAtom);

  const backdropRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (backdropRef.current && !backdropRef.current.contains(event.target)) {
        props.setNewFolder(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [backdropRef]);

  const handleCreateFolder = async () => {
    if (folderName.length === 0) {
      const input = document.getElementById("create-folder-input");
      input.focus();
      input.classList.add("input-no-name");
      input.placeholder = "Please enter a name";
      return;
    }
    if (folderUser.some((folder) => folder.name === folderName)) {
      const input = document.getElementById("create-folder-input");
      input.classList.add("input-no-name");
      const inputPara = document.getElementById("input-para");
      inputPara.style.color = "red";
      return;
    }
    const response = await fetch("http://localhost:3000/note/makefolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: authUser._id,
        name: folderName,
      }),
    });
    const data = await response.json();
    setFolderUser((prev) => [data.folder, ...prev]);
    props.setNewFolder(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateFolder();
  };

  return (
    <div className="create-folder-backdrop">
      <div className="create-folder" ref={backdropRef}>
        <h2 id="create-folder-heading">New Folder</h2>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            id="create-folder-input"
            autoFocus
            placeholder="Folder Name"
            onChange={(event) => {
              document
                .getElementById("create-folder-input")
                .classList.remove("input-no-name");
              setFolderName(event.target.value);
              document.getElementById("input-para").style.color = "transparent";
            }}
            autocomplete="off"
          />
        </form>

        <p id="input-para">Folder name already exists.</p>
        <div className="create-folder-buttons">
          <button id="cancel" onClick={() => props.setNewFolder(false)}>
            Cancel
          </button>
          <button id="create" onClick={handleCreateFolder}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
