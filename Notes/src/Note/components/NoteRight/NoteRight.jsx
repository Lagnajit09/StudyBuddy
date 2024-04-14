import React, { useEffect, useMemo, useState } from "react";
import "./NoteRight.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { folderUserAtom } from "../../../NoteStore/folderStore";
import { noteUserAtom } from "../../../NoteStore/noteStore";
import { useLocation } from "react-router-dom";
import CreateNote from "../CreateNote/CreateNote";
import NoteSlider from "../NoteSlider/NoteSlider";
import Create from "../Create/Create";
import AllNotes from "../AllNotes/AllNotes";
import AllFolders from "../AllFolders/AllFolders";

const NoteRight = () => {
  const [newFolder, setNewFolder] = useState(false);
  const authUser = useRecoilValue(authUserAtom);
  const setFolderUser = useSetRecoilState(folderUserAtom);
  const setNoteUser = useSetRecoilState(noteUserAtom);
  const location = useLocation();

  const notePath = useMemo(() => {
    return location.pathname.includes("/notes");
  }, [location]);

  const folderPath = useMemo(() => {
    return location.pathname.includes("/folders");
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/note/alldocs/${authUser._id}`
      );
      if (!response.ok) {
        console.log("Network error");
      }
      const data = await response.json();
      setFolderUser(data.folders);
      setNoteUser(data.notes);
    };
    fetchData();
  }, [authUser]);

  return (
    <div className="noteRight">
      {notePath && !folderPath && <AllNotes />}
      {folderPath && !notePath && <AllFolders />}
      {!notePath && !folderPath && (
        <>
          {/* <CreateNote
        heading="Recent Folders"
        icon="true"
        caption="New Folder"
        setNewFolder={setNewFolder}
      />
      <CreateNote heading="Recent Notes" icon="false" caption="New Note" /> */}
          <NoteSlider
            heading="Recent Folder"
            useFolderCards="true"
            setNewFolder={setNewFolder}
          />
          <NoteSlider heading="Recent Note" useFolderCards="false" />
          {newFolder && <Create setNewFolder={setNewFolder} />}
        </>
      )}
    </div>
  );
};

export default NoteRight;
