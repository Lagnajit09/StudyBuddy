import React, { useEffect } from "react";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { deletedFoldersAtom } from "../../../NoteStore/folderStore";
import { useRecoilValue, useRecoilState } from "recoil";
import AllFolders from "../AllFolders/AllFolders";

const TrashFolder = () => {
  const authUser = useRecoilValue(authUserAtom);
  const [deletedFolderUser, setDeletedFolderUser] =
    useRecoilState(deletedFoldersAtom);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/note/viewfolderstrash/${authUser._id}`
      );
      if (!response.ok) {
        console.log("Network error");
      }
      const data = await response.json();
      setDeletedFolderUser(data.folders);
    };
    fetchData();
  }, [authUser]);

  return (
    <div style={{ width: "100%" }}>
      <p style={{ width: "36%", margin: "3% 33%", color: "rgba(0,0,0,0.3)" }}>
        Folders in trash will be deleted permanently after 15days.
      </p>
      <AllFolders folderUser={deletedFolderUser} />
    </div>
  );
};

export default TrashFolder;
