import "./Profile.css";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../NavBar/SearchBar/SearchBar";
import Avatar from "@mui/material/Avatar";
import ProfileLeft from "./components/ProfileLeft/ProfileLeft";
import ProfileMiddle from "./components/ProfileMiddle/ProfileMiddle";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar>
        <h2
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Study Buddy.
        </h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" />
        <p>Chat Room</p>
        <p>Notes</p>
      </NavBar>
      <div className="profile-container">
        <ProfileLeft />
        <ProfileMiddle />
      </div>
    </>
  );
};

export default Profile;
