import "./Notes.css";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../NavBar/SearchBar/SearchBar";
import Avatar from "@mui/material/Avatar";
import NotesLeft from "./components/NotesLeft/NotesLeft";
import NotesRight from "./components/NotesRight/NotesRight";

const Notes = () => {
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
        <NotesLeft />
        <NotesRight/>
      </div>
    </>
  );
};

export default Notes;
