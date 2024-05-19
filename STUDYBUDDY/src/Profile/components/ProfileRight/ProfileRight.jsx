import "./ProfileRight.css";
import OpenCloseIcon from "../../../assets/Profile-Icons/ProfileRightIcon/OpenCloseIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";
import MyCalender from "./components/Calendar/MyCalender";
import Bio from "../../../assets/Profile-Icons/ProfileRightIcon/Biology.svg";
import Chem from "../../../assets/Profile-Icons/ProfileRightIcon/Chemistry.svg";
import Arrow from "../../../assets/Profile-Icons/ProfileRightIcon/arrow.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openCalendarAtom,
  openAddEvent,
  userEventsAtom,
} from "../../../store/profileStore/profileStore";
import { authUserAtom } from "../../../store/authAtom";
import { BASE_URL } from "../../../config";

const eventColors = [
  "linear-gradient(90deg,rgba(99, 180, 184, 1) 35%,rgba(213, 247, 249, 1) 100%)",
  "linear-gradient(90deg, rgba(161,151,252,1) 35%, rgba(255,255,255,1) 100%)",
  "linear-gradient(90deg, rgba(255,210,143,1) 35%, rgba(255,255,255,1) 100%)",
  "linear-gradient(90deg, rgba(231,136,149,1) 35%, rgba(255,255,255,1) 100%)",
  "linear-gradient(90deg, rgba(57,184,212,1) 35%, rgba(255,255,255,1) 100%)",
  "linear-gradient(90deg, rgba(121,178,217,1) 35%, rgba(255,255,255,1) 100%)",
];

const ProfileRight = (props) => {
  const authUser = useRecoilValue(authUserAtom);
  const [userEvents, setUserEvents] = useRecoilState(userEventsAtom);
  const [clicked, setClicked] = useRecoilState(openCalendarAtom);
  const [scheduleList, setScheduleList] = useState(false);
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

  useEffect(() => {
    const fetchAllEvents = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await fetch(`${BASE_URL}/user/events/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Network error!");
      }

      const data = await response.json();

      setUserEvents(data.events);
    };

    fetchAllEvents();
  }, [authUser]);

  // const index = useMemo(() => {
  //   return Math.floor(Math.random() * 6);
  // }, []);

  const events = useMemo(() => {
    if (scheduleList) {
      return userEvents;
    } else {
      if (userEvents.length > 2) {
        return [userEvents[0], userEvents[1]];
      } else return userEvents;
    }
  }, [scheduleList, userEvents]);

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

        {userEvents.length > 0 && (
          <div className="schedule-div">
            <span className="schedule-span">
              <img
                src={Arrow}
                className="s-arrow"
                onClick={() => {
                  scheduleList && setScheduleList(!scheduleList);
                }}
                style={{
                  display: scheduleList ? "block" : "none",
                }}
              />
              Schedule
            </span>

            <div className="schedule-list">
              {events.map((uevent, i) => {
                return (
                  <div
                    className={`schedule-item`}
                    style={{
                      background: eventColors[i],
                    }}
                  >
                    <div className="schedule-detail">
                      <span className="s-name">{uevent?.title}</span>
                      <span className="s-time">{`${uevent?.start} - ${uevent?.end}`}</span>
                    </div>
                    <img className="arrow" src={OpenCloseIcon} />
                  </div>
                );
              })}

              {/* <div className="schedule-item2">
              <img src={Chem} className="topic-icon2" />
              <div className="schedule-detail">
                <span className="s-name">Chemistry Course</span>
                <span className="s-time">11:00am - 12:00 pm</span>
              </div>
              <img className="arrow" src={OpenCloseIcon} />
            </div> */}
            </div>
          </div>
        )}
        {userEvents?.length > 0 && (
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
              See All Schedule
            </span>
            <img
              src={Arrow}
              className="ms-arrow"
              onClick={() => {
                setScheduleList(!scheduleList);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileRight;
