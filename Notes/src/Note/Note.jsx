import "./Note.css";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../NavBar/SearchBar/SearchBar";
import Avatar from "@mui/material/Avatar";
import NoteLeft from "./components/NoteLeft/NoteLeft";
import NoteRight from "./components/NotesRight/NoteRight";

const Note = () => {
  return (
    <>
      <NavBar>
        <h2>Study Buddy.</h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" />
        <p>Chat Room</p>
        <p>Notes</p>
        <Avatar
          src={"username"}
          alt={""}
          sx={{ bgcolor: "#00A9FF", width: "30px", height: "30px" }}
        />
      </NavBar>
      <div className="notes">
        <NoteLeft />
        <NoteRight/>
      </div>
    </>
  );
};

export default Note;
