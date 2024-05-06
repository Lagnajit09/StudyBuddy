import React, { useEffect } from "react";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { archivedFoldersAtom } from "../../../NoteStore/folderStore";
import { useRecoilValue, useRecoilState } from "recoil";
import AllFolders from "../AllFolders/AllFolders";

const ArchiveFolder = () => {
  const authUser = useRecoilValue(authUserAtom);
  const [archivedFolderUser, setArchivedFolderUser] =
    useRecoilState(archivedFoldersAtom);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/note/viewfoldersarchive/${authUser._id}`
      );
      if (!response.ok) {
        console.log("Network error");
      }
      const data = await response.json();
      setArchivedFolderUser(data.folders);
    };
    fetchData();
  }, [authUser]);

  return (
    <div>
      <AllFolders folderUser={archivedFolderUser} />
    </div>
  );
};

export default ArchiveFolder;
