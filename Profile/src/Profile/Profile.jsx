import './Profile.css';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../NavBar/SearchBar/SearchBar';
import Avatar from "@mui/material/Avatar";
import ProfileLeft from './components/ProfileLeft/ProfileLeft';
import ProfileMiddle from './components/ProfileMiddle/ProfileMiddle';


const Profile=()=> {
  return (
    <>
      <NavBar >
      <h2>Study Buddy.</h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" />
        <p>Chat Room</p>
        <p>Notes</p>
        <Avatar
          src={"username"}
          alt={""}          
          sx={{ bgcolor: "rgba(0, 169, 255, 1)",width: "30px", height: "30px" }}
        />
      </NavBar>
      <div className="profile-container">
        <ProfileLeft/>
        <ProfileMiddle/>        
      </div>
    </>
  )
}

export default Profile;
