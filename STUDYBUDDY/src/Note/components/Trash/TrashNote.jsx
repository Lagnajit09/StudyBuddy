import React, { useEffect } from "react";
import { authUserAtom } from "../../../store/authAtom";
import { deletedNotesAtom } from "../../../store/NoteStore/noteStore";
import { useRecoilValue, useRecoilState } from "recoil";
import AllNotes from "../AllNotes/AllNotes";
import { BASE_URL } from "../../../config";

const TrashNote = () => {
  const authUser = useRecoilValue(authUserAtom);
  const [deletedNoteUser, setDeletedNoteUser] =
    useRecoilState(deletedNotesAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      const response = await fetch(
        `${BASE_URL}/note/viewnotestrash/${authUser.userId}`,
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
      setDeletedNoteUser(data.notes);
    };
    fetchData();
  }, [authUser]);

  return (
    <div style={{ width: "100%" }}>
      <p style={{ width: "36%", margin: "3% 33%", color: "rgba(0,0,0,0.3)" }}>
        Notes in Trash will be deleted permanently after 15days.
      </p>
      <AllNotes noteUser={deletedNoteUser} />
    </div>
  );
};

export default TrashNote;
