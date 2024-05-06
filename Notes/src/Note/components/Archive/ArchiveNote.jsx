import React, { useEffect } from "react";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { archivedNotesAtom } from "../../../NoteStore/noteStore";
import { useRecoilValue, useRecoilState } from "recoil";
import AllNotes from "../AllNotes/AllNotes";

const ArchiveNote = () => {
  const authUser = useRecoilValue(authUserAtom);
  const [archivedNoteUser, setArchivedNoteUser] =
    useRecoilState(archivedNotesAtom);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/note/viewnotesarchive/${authUser._id}`
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
    <div>
      <AllNotes noteUser={archivedNoteUser} />
    </div>
  );
};

export default ArchiveNote;
