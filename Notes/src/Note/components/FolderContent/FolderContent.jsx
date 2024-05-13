import React, { useState, useEffect, useMemo } from "react";
import AllNotes from "../AllNotes/AllNotes";
import { folderUserAtom } from "../../../NoteStore/folderStore";
import { noteUserAtom } from "../../../NoteStore/noteStore";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

const FolderContent = () => {
  const userFolders = useRecoilValue(folderUserAtom);
  const params = useParams();
  const [selectedFolder, setSelectedFolder] = useState({});
  const userNotes = useRecoilValue(noteUserAtom);

  const folderId = useMemo(() => {
    return params.folderid;
  }, [params]);

  useEffect(() => {
    setSelectedFolder(userFolders.find((folder) => folder._id === folderId));
  }, [params, userFolders]);

  const folderNotes = userNotes.filter((note) => note.folder_id === folderId);

  return (
    <>
      <span
        style={{
          fontSize: "25px",
          margin: "40px 0 0 100px",
          fontWeight: "550",
        }}
      >
        {selectedFolder?.name}
      </span>
      <AllNotes noteUser={folderNotes} />
    </>
  );
};

export default FolderContent;
