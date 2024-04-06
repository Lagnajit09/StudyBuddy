import "./ProfileLeft.css";
import Avatar from "@mui/material/Avatar";
import PenIcon from "../../../assets/Icons/ProfileLeftIcon/pen-icon.svg";
import { CiCalendar } from "react-icons/ci";
import { PiQuestionLight } from "react-icons/pi";
import { PiUserCircleLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";

const ProfileLeft = () => {
  return (
    <div className="profileLeft-container">
      <div className="profile-top">
              <Avatar
                src={"username"}
                alt={"Nicolos Cage"}
                sx={{
                  bgcolor: "rgba(0, 169, 255, 1)",
                  width: "80px",
                  height: "80px",
                  fontSize:"54px"
             }}
              />           
            <div className="username">
              <div className="uname-span">
                <span>Nicolos Cage</span>
              </div>
              <div className="edit-profile">
                <img src={PenIcon} alt="edit profile" />
              </div>
            </div>
      </div>

      <div className="profile-bottom">
        <div className="profile-bottom-sub">
            <PiUserCircleLight style={{height:"30px",width:"30px"}}/>
            <span className="profile-span">Profile</span>
        </div>

        <div className="profile-bottom-sub">
            <CiCalendar style={{height:"30px",width:"30px"}}/>
            <span className="calender-span">Calender</span>
        </div>

        <div className="profile-bottom-sub">
            <CiSettings style={{height:"30px",width:"30px"}}/>
            <span className="settings-span">Settings</span>
        </div>

        <div className="profile-bottom-sub">
            <PiQuestionLight style={{height:"30px",width:"30px"}}/>
            <span className="help-span">Help Center</span>
        </div>
      </div>
    </div>  
    
  );
};

export default ProfileLeft;
