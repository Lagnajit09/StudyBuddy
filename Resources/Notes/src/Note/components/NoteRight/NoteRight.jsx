import React, { useEffect, useMemo, useState } from "react";
import "./NoteRight.css";
import { useRecoilValue, useRecoilState } from "recoil";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { folderUserAtom } from "../../../NoteStore/folderStore";
import { noteUserAtom } from "../../../NoteStore/noteStore";
import { topicAtom } from "../../../NoteStore/Topic";
import { useLocation, useParams } from "react-router-dom";
import CreateNote from "../CreateNote/CreateNote";
import NoteSlider from "../NoteSlider/NoteSlider";
import Create from "../Create/Create";
import AllNotes from "../AllNotes/AllNotes";
import AllFolders from "../AllFolders/AllFolders";
import SelectFolder from "../SelectFolder/SelectFolder";
import Move from "../Move/Move";
import FolderContent from "../FolderContent/FolderContent";
import TrashFolder from "../Trash/TrashFolder";
import TrashNote from "../Trash/TrashNote";
import ArchiveFolder from "../Archive/ArchiveFolder";
import ArchiveNote from "../Archive/ArchiveNote";
import TopicRight from "../TopicRight/TopicRight";

const customOrder = [
  "Biology",
  "Physics",
  "Chemistry",
  "IT and Software",
  "Mathematics",
  "Cloud Computing",
];

const NoteRight = () => {
  const [newFolder, setNewFolder] = useState(false);
  const [addToFolder, setAddToFolder] = useState(-1);
  const [move, setMove] = useState(false);
  const authUser = useRecoilValue(authUserAtom);
  const [folderUser, setFolderUser] = useRecoilState(folderUserAtom);
  const [noteUser, setNoteUser] = useRecoilState(noteUserAtom);
  const [topics, setTopics] = useRecoilState(topicAtom);
  const location = useLocation();
  const params = useParams();

  const notePath = useMemo(() => {
    return location.pathname.includes("/notes");
  }, [location]);

  const folderPath = useMemo(() => {
    return location.pathname.includes("/folders");
  }, [location]);

  const folderContent = useMemo(() => {
    return params.folderid;
  }, [params]);

  const folderTrash = useMemo(() => {
    return location.pathname.includes("/trash/folder");
  }, [location]);

  const noteTrash = useMemo(() => {
    return location.pathname.includes("/trash/note");
  }, [location]);

  const folderArchive = useMemo(() => {
    return location.pathname.includes("/archive/folder");
  }, [location]);

  const noteArchive = useMemo(() => {
    return location.pathname.includes("/archive/note");
  }, [location]);

  const topicPath = useMemo(() => {
    return location.pathname.includes("/note/topic/");
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
  }, [authUser, topics]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/note/viewtopics/${authUser._id}`
      );
      if (!response.ok) {
        console.log("Network error");
      }
      const data = await response.json();

      // Sort the topics array based on custom order
      const updatedTopic = data.topics;
      updatedTopic.sort((a, b) => {
        return customOrder.indexOf(a.name) - customOrder.indexOf(b.name);
      });
      setTopics(updatedTopic);
    };
    fetchData();
  }, [authUser]);

  return (
    <div className="noteRight">
      {notePath && !folderPath && <AllNotes noteUser={noteUser} />}
      {folderPath && !notePath && <AllFolders folderUser={folderUser} />}
      {folderContent && <FolderContent />}
      {folderTrash && <TrashFolder />}
      {noteTrash && <TrashNote />}
      {folderArchive && <ArchiveFolder />}
      {noteArchive && <ArchiveNote />}
      {topicPath && (
        <TopicRight
          setNewFolder={setNewFolder}
          setAddToFolder={setAddToFolder}
        />
      )}
      {!notePath &&
        !folderPath &&
        !folderContent &&
        !folderTrash &&
        !noteTrash &&
        !folderArchive &&
        !noteArchive &&
        !topicPath && (
          <>
            {folderUser.length < 1 ? (
              <CreateNote
                heading="Recent Folder"
                icon="true"
                caption="New Folder"
                setNewFolder={setNewFolder}
              />
            ) : (
              <NoteSlider
                heading="Recent Folder"
                useFolderCards="true"
                setNewFolder={setNewFolder}
              />
            )}
            {noteUser.length < 1 ? (
              <CreateNote
                heading="Recent Note"
                icon="false"
                caption="New Note"
              />
            ) : (
              <NoteSlider
                heading="Recent Note"
                useFolderCards="false"
                setAddToFolder={setAddToFolder}
              />
            )}

            {newFolder && <Create setNewFolder={setNewFolder} />}
            {addToFolder >= 0 && (
              <SelectFolder
                addToFolder={addToFolder}
                setAddToFolder={setAddToFolder}
                setMove={setMove}
              />
            )}
            {move && <Move move={move} />}
          </>
        )}
    </div>
  );
};

export default NoteRight;
