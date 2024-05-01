import "./ProfileLeft.css";
import Avatar from "@mui/material/Avatar";
import { RiEdit2Line } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { PiQuestionLight } from "react-icons/pi";
import { PiUserCircleLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { SlLogout } from "react-icons/sl";
import { useRecoilState, useRecoilValue } from "recoil";
import { openCalendarAtom } from "../../../store/profileStore/profileStore";
import { Link, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { authUserAtom } from "../../../store/authAtom";

const ProfileLeft = () => {
  const authUser = useRecoilValue(authUserAtom);
  const [clicked, setClicked] = useRecoilState(openCalendarAtom);
  const location = useLocation();
  const path = useMemo(() => {
    return location.pathname;
  }, [location]);

  return (
    <div className="profileLeft-container">
      <div className="profile-top">
        <Avatar
          src={authUser?.user?.profile_pic}
          alt={authUser?.user?.firstname.toUpperCase()}
          className="avatar-com"
          sx={{
            bgcolor: authUser?.user?.profile_pic,
            width: "80px",
            height: "80px",
            fontSize: "54px",
          }}
        />
        <div className="username">
          <div className="uname-span">
            <span>{authUser?.user?.firstname}</span>
          </div>
          <div className="edit-profile">
            <RiEdit2Line />
          </div>
        </div>
      </div>

      <div className="profile-bottom">
        <Link to="/profile">
          <div className="profile-bottom-sub">
            <PiUserCircleLight
              style={{
                height: "30px",
                width: "30px",
                color: path.includes("profile") ? "#00A9FF" : "#000000",
                cursor: "pointer",
              }}
            />
            <span
              className="profile-span"
              style={{
                color: path.includes("profile") ? "#00A9FF" : "#000000",
              }}
            >
              Profile
            </span>
          </div>
        </Link>
        <div className="profile-bottom-sub">
          <CiCalendar
            style={{
              height: "30px",
              width: "30px",
              color: clicked ? "#00A9FF" : "#000000",
              cursor: "pointer",
            }}
          />
          <span
            className="calender-span"
            style={{ color: clicked ? "#00A9FF" : "#000000" }}
            onClick={() => {
              setClicked(!clicked);
            }}
          >
            Calender
          </span>
        </div>
        <Link to="/settings">
          <div className="profile-bottom-sub">
            <CiSettings
              style={{
                height: "30px",
                width: "30px",
                cursor: "pointer",
                color: path.includes("settings") ? "#00A9FF" : "#000000",
              }}
            />
            <span
              className="settings-span"
              style={{
                color: path.includes("settings") ? "#00A9FF" : "#000000",
              }}
            >
              Settings
            </span>
          </div>
        </Link>
        <Link to="/help">
          <div className="profile-bottom-sub">
            <PiQuestionLight
              style={{
                height: "30px",
                width: "30px",
                cursor: "pointer",
                color: path.includes("help") ? "#00A9FF" : "#000000",
              }}
            />
            <span
              className="help-span"
              style={{
                color: path.includes("help") ? "#00A9FF" : "#000000",
              }}
            >
              Help Center
            </span>
          </div>
        </Link>
        <div className="profile-bottom-sub">
          <SlLogout
            style={{
              height: "25px",
              width: "25px",
              padding: "1.1%",
              color: "rgba(255, 50, 50, 0.8)",
              cursor: "pointer",
            }}
          />
          <span
            className="logout-span"
            style={{ color: "rgba(255, 50, 50, 0.8)" }}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeft;
