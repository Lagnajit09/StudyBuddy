import "./ProfileRight.css";
import OpenCloseIcon from "../../../assets/Icons/ProfileRightIcon/OpenCloseIcon.svg";
import AddIcon from "../../../assets/Icons/ProfileRightIcon/AddIcon.svg";
import SearchIcon from "../../../assets/Icons/ProfileRightIcon/SearchIcon.svg";
import NotificationIcon from "../../../assets/Icons/ProfileRightIcon/NotificationIcon.svg";
import { useEffect, useState } from "react";
import MyCalender from "./components/Calendar/MyCalender";
import Bio from "../../../assets/Icons/ProfileRightIcon/Biology.svg";
import Chem from "../../../assets/Icons/ProfileRightIcon/Chemistry.svg";
import Arrow from "../../../assets/Icons/ProfileRightIcon/arrow.svg";
const ProfileRight = (props) => {
  const [clicked, setClicked] = useState(false);
  const [scheduleList, setScheduleList] = useState(false);

  useEffect(() => {
    if (scheduleList) {
      document
        .getElementsByClassName("calender-div")[0]
        .classList.add("modi-calender-div");
      
    } else {
      document
        .getElementsByClassName("calender-div")[0]
        .classList.remove("modi-calender-div");
    }
  }, [scheduleList]);

  return (
    <div className="profileRight-container">
      <div className="profileRight-left">
        <img
          style={{ rotate: clicked ? "0deg" : "-180deg" }}
          src={OpenCloseIcon}
          onClick={() => {
            setClicked(!clicked);
            props.setOpen(!props.open);
          }}
        />
      </div>

      <div className="profileRight-right">
        <div
          className="icons"
          style={{ paddingBottom: scheduleList ? "0%" : "5%" }}
        >
          <img src={SearchIcon} />
          <img src={NotificationIcon} />
          <img src={AddIcon} className="add-icon" style={{display:scheduleList?"none":"block"}}/>
        </div>

        <div className="calender-div">
          <MyCalender />
        </div>

        <div className="schedule-div">
          <span className="schedule-span">
            <img
              src={Arrow}
              className="s-arrow"
              onClick={() => {
                setScheduleList(!scheduleList);
              }}
              style={{ display: scheduleList ? "block" : "none" }}
            />
            Schedule
          </span>

          <div className="schedule-list">
            <div className="schedule-item1">
              <img src={Bio} className="topic-icon" />
              <div className="schedule-detail">
                <span className="s-name">Botany Course</span>
                <span className="s-time">11:00am - 12:00 pm</span>
              </div>
              <img className="arrow" src={OpenCloseIcon} />
            </div>

            <div className="schedule-item2">
              <img src={Chem} className="topic-icon" />
              <div className="schedule-detail">
                <span className="s-name">Chemistry Course</span>
                <span className="s-time">11:00am - 12:00 pm</span>
              </div>
              <img className="arrow" src={OpenCloseIcon} />
            </div>
          </div>
        </div>
        <div
          className="more-schedule"
          style={{ display: scheduleList ? "none" : "flex" }}
        >
          <span
            className="m-schedule-span"
            onClick={() => {
              setScheduleList(!scheduleList);
            }}
          >
            See More Schedule
          </span>
          <img
            src={Arrow}
            className="ms-arrow"
            onClick={() => {
              setScheduleList(!scheduleList);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileRight;
