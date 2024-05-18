import "./ProfileRight.css";
import OpenCloseIcon from "../../../assets/Icons/ProfileRightIcon/OpenCloseIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import MyCalender from "./components/Calendar/MyCalender";
import Bio from "../../../assets/Icons/ProfileRightIcon/Biology.svg";
import Chem from "../../../assets/Icons/ProfileRightIcon/Chemistry.svg";
import Arrow from "../../../assets/Icons/ProfileRightIcon/arrow.svg";
import { useRecoilState } from "recoil";
import {
  openCalendarAtom,
  openAddEvent,
} from "../../../profileStore/profileStore";

const ProfileRight = (props) => {
  const [clicked, setClicked] = useRecoilState(openCalendarAtom);
  const [scheduleList, setScheduleList] = useState(false);
  const [notificationList, setNotificationList] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [showForm, setShowForm] = useRecoilState(openAddEvent);

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

//   useEffect(() => {
//     if (notificationList) {
//       document
//         .getElementsByClassName("calender-div")[0]
//         .classList.add("modi-calender-div");
//       document
//         .getElementsByClassName("schedule-list")[0]
//         .classList.add("modi-calender-div");
//       document
//         .getElementsByClassName("more-schedule")[0]
//         .classList.add("modi-calender-div");
//       document
//         .getElementsByClassName("m-schedule-span")[0]
//         .classList.add("modi-calender-div");
// console.log(document.getElementsByClassName("schedule-span")[0].innerHTML)
//       // document.getElementsByClassName("schedule-span")[0].textContent =
//       //   {<img src='/src/assets/Icons/ProfileRightIcon/arrow.svg' class='s-arrow' style='display: block;'>}Notification;
//       // document.getElementsByClassName("schedule-span")[0].innerHTML =
//       // "<img src='/src/assets/Icons/ProfileRightIcon/arrow.svg' class='s-arrow' style='display: block;'>Notification";
//     } else {
//       document
//         .getElementsByClassName("calender-div")[0]
//         .classList.remove("modi-calender-div");
//       document
//         .getElementsByClassName("schedule-list")[0]
//         .classList.remove("modi-calender-div");
//       document
//         .getElementsByClassName("more-schedule")[0]
//         .classList.remove("modi-calender-div");
//       document
//         .getElementsByClassName("m-schedule-span")[0]
//         .classList.remove("modi-calender-div");
//       // document.getElementsByClassName("schedule-span")[0].textContent =
//       //   "<img src='/src/assets/Icons/ProfileRightIcon/arrow.svg' class='s-arrow' style='display: block;'>Schedule";
//       // document.getElementsByClassName("schedule-span")[0].innerHTML =
//       // "<img src='/src/assets/Icons/ProfileRightIcon/arrow.svg' class='s-arrow' style='display: block;'>Schedule";
//     }
//   }, [notificationList]);

  useEffect(() => {
    if (searchBar) {
      document
        .getElementsByClassName("S-icon-btn")[0]
        .classList.add("s-bar-sIcon");
      if (scheduleList) {
        document.getElementsByClassName("s-bar-input")[0].style.padding =
          "3% 30% 3% 10%";
      } else {
        document.getElementsByClassName("s-bar-input")[0].style.padding =
          "3% 8% 3% 12.5%";
      }
    } else {
      document
        .getElementsByClassName("S-icon-btn")[0]
        .classList.remove("s-bar-sIcon");
    }
  }, [searchBar, scheduleList]);

  return (
    <div className="profileRight-container">
      <div className="profileRight-left">
        <img
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
          <SearchIcon
            className="S-icon-btn"
            onClick={() => {
              setSearchBar(!searchBar);
            }}
          />
          <input
            type="text"
            className="s-bar-input"
            placeholder="Search"
            style={{ display: searchBar ? "flex" : "none" }}
          />

          {/* <NotificationsNoneIcon
            className="N-icon-btn"
            style={{ display: scheduleList || searchBar ? "none" : "block" }}
            onClick={() => {
              setNotificationList(!notificationList);
            }}
          /> */}

          <AddIcon
            className="A-icon-btn"
            style={{ display: scheduleList ? "none" : "block" }}
            onClick={() => {
              setShowForm(!showForm);
            }}
          />
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
                
                  setScheduleList(!scheduleList)
                  
              }}
              style={{
                display: scheduleList ? "block" : "none",
              }}
            />
            Schedule
          </span>

          <div className="schedule-list">
            <div className="schedule-item1">
              <img src={Bio} className="topic-icon1" />
              <div className="schedule-detail">
                <span className="s-name">Botany Course</span>
                <span className="s-time">11:00am - 12:00 pm</span>
              </div>
              <img className="arrow" src={OpenCloseIcon} />
            </div>

            <div className="schedule-item2">
              <img src={Chem} className="topic-icon2" />
              <div className="schedule-detail">
                <span className="s-name">Chemistry Course</span>
                <span className="s-time">11:00am - 12:00 pm</span>
              </div>
              <img className="arrow" src={OpenCloseIcon} />
            </div>
            {/* {scheduleList && (
              <>
                <div className="schedule-item2">
                  <img src={Chem} className="topic-icon2" />
                  <div className="schedule-detail">
                    <span className="s-name">Chemistry Course</span>
                    <span className="s-time">11:00am - 12:00 pm</span>
                  </div>
                  <img className="arrow" src={OpenCloseIcon} />
                </div>
                <div className="schedule-item1">
                  <img src={Bio} className="topic-icon1" />
                  <div className="schedule-detail">
                    <span className="s-name">Botany Course</span>
                    <span className="s-time">11:00am - 12:00 pm</span>
                  </div>
                  <img className="arrow" src={OpenCloseIcon} />
                </div>
              </>
            )} */}
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
            style={{ display: notificationList ? "none" : "block" }}
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
