import "./ProfileMiddle.css";
import ProfileRight from "../ProfileRight/ProfileRight";
import clock from "../../../assets/Profile-Icons/ProfileMiddleIcon/ClockIcon.svg";
import bookIcon from "../../../assets/Profile-Icons/ProfileMiddleIcon/BookIcon.svg";
import bellIcon from "../../../assets/Profile-Icons/ProfileMiddleIcon/BellIcon.svg";
import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openAddEvent,
  openCalendarEvent,
  defDate,
  openCalendarAtom,
  defSTime,
  defETime,
  userCoursesAtom,
  recommendedCoursesAtom,
  userEventsAtom,
} from "../../../store/profileStore/profileStore";
import Card from "./component/Card/Card";
// import { my_course_name } from "./component/content-list";
import TopicSlider from "./component/ProfileSlider/TopicSlider/TopicSlider";
import { createEvent } from "../ProfileMiddle/component/createEvent.js";
import { useNavigate } from "react-router-dom";

const ProfileMiddle = () => {
  const navigate = useNavigate();
  const my_course_name = useRecoilValue(userCoursesAtom);
  const recommendedCourses = useRecoilValue(recommendedCoursesAtom);
  const [openRight, setOpenRight] = useRecoilState(openCalendarEvent);
  const [showForm, setShowForm] = useRecoilState(openAddEvent);
  const [seeAll, setSeeAll] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(defDate);
  const [clicked, setClicked] = useRecoilState(openCalendarAtom);
  const [inputStartTime, setInputStartTime] = useRecoilState(defSTime);
  const [inputEndTime, setInputEndTime] = useRecoilState(defETime);
  const [title, setTitle] = useState("");
  const [noti, setNoti] = useState(false);
  const [userEvents, setUserEvents] = useRecoilState(userEventsAtom);

  const createCard = (index) => (
    <Card
      key={my_course_name[index]?.id}
      img={my_course_name[index]?.img}
      c_name={my_course_name[index]?.c_name}
      cap={my_course_name[index]?.cap}
      c_dest={my_course_name[index]?.c_dest}
      cap_color={my_course_name[index]?.cap_color}
      cap_bcolor={my_course_name[index]?.cap_bcolor}
      course={my_course_name}
      related_courses={recommendedCourses}
      index={index}
    />
  );

  const newArr = [];
  for (let i = 0; i < my_course_name.length; i += 4) {
    // Slice the 1D array into chunks of 4 elements and add them to the rows array
    const row = my_course_name.slice(i, i + 4);
    newArr.push(row);
  }

  return (
    <>
      <div className="profile-middle">
        <div
          className="profileMiddle-container"
          style={{ width: openRight ? "100%" : "100%" }}
        >
          <div className="pm-top">
            <span className="pm-top-span">
              My courses
              {my_course_name.length == 0 && (
                <div
                  className="no-courses"
                  onClick={() => {
                    navigate("/courses");
                  }}
                >
                  <span className="no-courses-span">Discover Courses!</span>
                </div>
              )}
              {my_course_name.length > 4 && (
                <button
                  className="seeAll-btn"
                  onClick={() => {
                    setSeeAll(!seeAll);
                  }}
                >
                  SEE ALL
                </button>
              )}
            </span>
            <div className="card-list">
              {newArr[0]?.map((item, index) => {
                return createCard(index);
              })}

              {seeAll && (
                <div className="card-list-all">
                  {newArr.slice(1, newArr.length).map((item, indexP) => {
                    return item.map((obj, index) => {
                      return createCard(index + 4 * (indexP + 1));
                    });
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="pm-bottom">
            <span className="pm-bottom-span">Recommended courses</span>
            <TopicSlider from="profile" />
          </div>
        </div>

        {showForm && (
          <div className="Add-Event-modal">
            <div
              className="ae-overlay"
              onClick={() => {
                setShowForm(!showForm);
              }}
            ></div>
            <div
              className="modal-container"
              style={{ left: clicked ? "18.5%" : "33%" }}
            >
              <div className="ae-modal-content">
                <input
                  type="text"
                  placeholder="Add Title"
                  className="addTitle"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <div className="time-div">
                  <img src={clock} style={{ cursor: "pointer" }} />
                  <input
                    type="date"
                    id="eventdate"
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(event.target.value);
                      console.log(event.target.value);
                      // setSelectedDate(!selectedDate);
                      // defDateHandler(event,"def-date","eventdate",selectedDate);
                    }}
                  />

                  <input
                    type="time"
                    value={inputStartTime}
                    // onClick={() => {
                    //   // generateTimeOptions("starttime-dropdown");
                    //   // startTimeHandler();
                    // }}
                    onChange={(event) => {
                      setInputStartTime(event.target.value);
                      console.log(event.target.value);
                    }}
                    className="starttime-input"
                  />

                  <input
                    type="time"
                    value={inputEndTime}
                    // onClick={() => {
                    //   // generateTimeOptions("endtime-dropdown");
                    //   endTimeHandler();
                    // }}
                    onChange={(event) => {
                      setInputEndTime(event.target.value);
                    }}
                    className="endtime-input"
                  />
                </div>
                <div className="checkbox-div">
                  <input
                    type="checkbox"
                    id="check-i"
                    style={{ background: "transparent" }}
                  />
                  <span className="checkbox-span">All day</span>
                </div>
                <select className="select-event">
                  <option value="No">Do not repeat</option>
                  <option value="Yes">Repeat</option>
                </select>
                <div className="add-course">
                  <img src={bookIcon} style={{ cursor: "pointer" }} />
                  <span className="add-course-span">
                    Add My Courses in schedule
                  </span>
                </div>
                <div className="add-noti">
                  <img src={bellIcon} style={{ cursor: "pointer" }} />
                  <span
                    className="add-noti-span"
                    onClick={() => {
                      setNoti(!noti);
                    }}
                  >
                    {noti ? "Added" : "Add Notification"}
                  </span>
                </div>
                <div className="save-btn">
                  <button
                    onClick={() => {
                      setShowForm(!showForm);
                      createEvent(
                        title,
                        selectedDate,
                        inputStartTime,
                        inputEndTime,
                        noti,
                        userEvents,
                        setUserEvents
                      );
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="profileMiddle-extra"
          style={{ right: clicked ? "0%" : "-24.5%" }}
        >
          <ProfileRight open={openRight} setOpen={setOpenRight} />
        </div>
      </div>
    </>
  );
};

export default ProfileMiddle;
