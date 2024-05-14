import React, { useEffect } from "react";
import { authUserAtom } from "../../../store/authAtom";
import { archivedNotesAtom } from "../../../store/NoteStore/noteStore";
import { useRecoilValue, useRecoilState } from "recoil";
import AllNotes from "../AllNotes/AllNotes";
import NoContent from "../NoContent/NoContent";
import { LiaStickyNoteSolid } from "react-icons/lia";
import { BASE_URL } from "../../../config";

const ArchiveNote = () => {
  const authUser = useRecoilValue(authUserAtom);
  const [archivedNoteUser, setArchivedNoteUser] =
    useRecoilState(archivedNotesAtom);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/note/viewnotesarchive/${authUser.userId}`,
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
      setArchivedNoteUser(data.notes);
    };
    fetchData();
  }, [authUser]);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {archivedNoteUser.length === 0 ? (
        <NoContent
          icon={
            <LiaStickyNoteSolid
              style={{ color: "#00a9ff", fontSize: "70px" }}
            />
          }
          desc="Your archived notes will be displayed here. To archive notes go to 'All Notes'."
        />
      ) : (
        <AllNotes noteUser={archivedNoteUser} />
      )}
    </div>
  );
};

export default ArchiveNote;
