import React, { useEffect } from "react";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { deletedNotesAtom } from "../../../NoteStore/noteStore";
import { useRecoilValue, useRecoilState } from "recoil";
import AllNotes from "../AllNotes/AllNotes";

const TrashNote = () => {
  const authUser = useRecoilValue(authUserAtom);
  const [deletedNoteUser, setDeletedNoteUser] =
    useRecoilState(deletedNotesAtom);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/note/viewnotestrash/${authUser._id}`
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
