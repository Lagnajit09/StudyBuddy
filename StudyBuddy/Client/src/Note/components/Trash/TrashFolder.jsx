import React, { useEffect } from "react";
import { authUserAtom } from "../../../store/authAtom";
import { deletedFoldersAtom } from "../../../store/NoteStore/folderStore";
import { useRecoilValue, useRecoilState } from "recoil";
import AllFolders from "../AllFolders/AllFolders";
import { BASE_URL } from "../../../config";

const TrashFolder = () => {
  const authUser = useRecoilValue(authUserAtom);
  const [deletedFolderUser, setDeletedFolderUser] =
    useRecoilState(deletedFoldersAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      const response = await fetch(
        `${BASE_URL}/note/viewfolderstrash/${authUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
