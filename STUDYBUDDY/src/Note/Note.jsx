import "./Note.css";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../NavBar/SearchBar/SearchBar";
import Avatar from "@mui/material/Avatar";
import NoteLeft from "./components/NoteLeft/NoteLeft";
import NoteRight from "./components/NoteRight/NoteRight";
import NoteNavBar from "./components/NoteNavBar/NoteNavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../store/authAtom";

const Note = () => {
  const navigate = useNavigate();
  const authUser = useRecoilValue(authUserAtom);

  if (!authUser.user) {
    useEffect(() => {
      navigate("/");
    }, [authUser]);
    return;
  }

  return (
    <>
      <NavBar>
        <h2
          onClick={() => {
            navigate("/");
          }}
        >
          Study Buddy.
        </h2>
        <p
          onClick={() => {
            navigate("/courses");
          }}
        >
          Courses
        </p>
        <SearchBar className="searchWidth" placeholder="Search Chat Room" />
        <p
          onClick={() => {
            navigate("/chatroom/community");
          }}
        >
          Chat Room
        </p>
        <p
          onClick={() => {
            navigate("/note");
          }}
        >
          Notes
        </p>
      </NavBar>
      {/* <NoteNavBar /> */}
      <div className="notes">
        <NoteLeft />
        <NoteRight />
      </div>
    </>
  );
};

export default Note;
