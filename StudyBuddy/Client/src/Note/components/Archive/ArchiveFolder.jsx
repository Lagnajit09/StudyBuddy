import React, { useEffect } from "react";
import { authUserAtom } from "../../../store/authAtom";
import { archivedFoldersAtom } from "../../../store/NoteStore/folderStore";
import { useRecoilValue, useRecoilState } from "recoil";
import AllFolders from "../AllFolders/AllFolders";
import NoContent from "../NoContent/NoContent";
import { FaRegFolderOpen } from "react-icons/fa";
import { BASE_URL } from "../../../config";

const ArchiveFolder = () => {
  const authUser = useRecoilValue(authUserAtom);
  const [archivedFolderUser, setArchivedFolderUser] =
    useRecoilState(archivedFoldersAtom);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/note/viewfoldersarchive/${authUser.userId}`,
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
      setArchivedFolderUser(data.folders);
    };
    fetchData();
  }, [authUser]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {archivedFolderUser.length === 0 ? (
        <NoContent
          icon={
            <FaRegFolderOpen style={{ color: "#00a9ff", fontSize: "70px" }} />
          }
          desc="Your archived folders will be displayed here. To archive folders go to 'All Notes'."
        />
      ) : (
        <AllFolders folderUser={archivedFolderUser} />
      )}
    </div>
  );
};

export default ArchiveFolder;
