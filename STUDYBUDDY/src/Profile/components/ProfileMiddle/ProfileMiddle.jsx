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
} from "../../../store/profileStore/profileStore";
import Card from "./component/Card/Card";
// import { my_course_name } from "./component/content-list";
import TopicSlider from "./component/ProfileSlider/TopicSlider/TopicSlider";
import { getCurrentDate, defDateHandler } from "../../helperfunction";
import { createEvent } from "../ProfileMiddle/component/createEvent.js";

const ProfileMiddle = () => {
  const my_course_name = useRecoilValue(userCoursesAtom);
  const recommendedCourses = useRecoilValue(recommendedCoursesAtom);
  const [openRight, setOpenRight] = useRecoilState(openCalendarEvent);
  const [showForm, setShowForm] = useRecoilState(openAddEvent);
  const [seeAll, setSeeAll] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(defDate);
  const [clicked, setClicked] = useRecoilState(openCalendarAtom);
  // const [selectedStartTime, setSelectedStartTime] = useState(false);
  // const [selectedEndTime, setSelectedEndTime] = useState(false);
  const [inputStartTime, setInputStartTime] = useRecoilState(defSTime);
  const [inputEndTime, setInputEndTime] = useRecoilState(defETime);
  // (new Date(Date.now()).getHours() == "0"
  //     ? "00"
  //     : new Date(Date.now()).getHours()) +
  //     ":" +
  //     (new Date(Date.now()).getMinutes() == "0"
  //       ? "00"
  //       : new Date(Date.now()).getMinutes() ||
  //         new Date(Date.now()).getMinutes() < 10
  //       ? "0" + new Date(Date.now()).getMinutes()
  //       : new Date(Date.now()).getMinutes())
  // new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
  //(new Date(Date.now()).getMinutes()=='0'?"00":new Date(Date.now()).getMinutes() || (new Date(Date.now()).getMinutes()<10?'0'+new Date(Date.now()).getMinutes():new Date(Date.now()).getMinutes()) )

  // const startTimeHandler = () => {
  //   console.log(selectedStartTime);
  //   setSelectedStartTime(!selectedStartTime);
  //   console.log(selectedStartTime);
  //   if (!selectedStartTime) {
  //     document.getElementsByClassName("starttime-dropdown")[0].style.display =
  //       "flex";
  //     // document.getElementsByClassName("endtime-dropdown")[0].style.display = "none";
  //   } else {
  //     document.getElementsByClassName("starttime-dropdown")[0].style.display =
  //       "none";
  //     // document.getElementsByClassName("endtime-dropdown")[0].style.display="flex";
  //   }
  // };

  // const endTimeHandler = () => {
  //   setSelectedEndTime(!selectedEndTime);
  //   if (!selectedEndTime) {
  //     document.getElementsByClassName("endtime-dropdown")[0].style.display =
  //       "flex";
  //     console.log("endTime");
  //     // document.getElementsByClassName("starttime-dropdown")[0].style.display="none";
  //   } else {
  //     document.getElementsByClassName("endtime-dropdown")[0].style.display =
  //       "none";
  //     // document.getElementsByClassName("starttime-dropdown")[0].style.display = "flex";
  //   }
  // };

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

  // const getCurrentTime = () => {
  //   console.log("fu start");
  //   const now = new Date(); // Get the current date and time

  //   // Extract hours and minutes from the current date and time
  //   const hours = now.getHours();
  //   const minutes = now.getMinutes();

  //   // Format the hours and minutes into a 2-digit format (e.g., '02' instead of '2')
  //   const formattedHours = String(hours).padStart(2, "0");
  //   const formattedMinutes = String(minutes).padStart(2, "0");

  //   // Combine the formatted hours and minutes into a time string
  //   const currentTime = `${formattedHours}:${formattedMinutes}`;
  //   console.log("fu end");
  //   // Return the current time
  //   return currentTime;
  // };

  // function generateTimeOptions(targetclass) {
  //   const selectElement = document.getElementsByClassName(targetclass)[0];
  //   selectElement.innerHTML = "";
  //   console.log("fu");
  //   // Start time is 00:00
  //   let hours = 0;
  //   let minutes = 0;

  //   // Step in minutes (30 minutes)
  //   const step = 30;

  //   while (hours < 24) {
  //     // Format hours and minutes into HH:MM format
  //     const formattedHours = String(hours).padStart(2, "0");
  //     const formattedMinutes = String(minutes).padStart(2, "0");
  //     const timeString = `${formattedHours}:${formattedMinutes}`;

  //     // Create an option element
  //     const option = document.createElement("span");
  //     option.value = timeString;
  //     option.textContent = timeString;
  //     option.className = "time-option";
  //     option.onclick = () => {
  //       getTimeVal(option.innerHTML, targetclass);
  //     };

  //     // Add the option to the select element
  //     selectElement.appendChild(option);

  //     // Increment time by 30 minutes
  //     minutes += step;

  //     // If minutes reach 60, increment the hours and reset minutes
  //     if (minutes >= 60) {
  //       minutes = 0;
  //       hours++;
  //     }
  //   }
  //   return;
  // }

  // const getTimeVal = (val, tClass) => {
  //   if (tClass == "starttime-dropdown") {
  //     setInputStartTime(val);
  //     document.getElementsByClassName("starttime-dropdown")[0].style.display =
  //       "none";
  //   } else {
  //     setInputEndTime(val);
  //     document.getElementsByClassName("endtime-dropdown")[0].style.display =
  //       "none";
  //   }
  // };

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
                />
                <div className="time-div">
                  <img src={clock} style={{ cursor: "pointer" }} />

                  <label htmlFor="eventdate" id="def-date">
                    {getCurrentDate()}
                  </label>

                  <input
                    type="date"
                    id="eventdate"
                    onClick={(event) => {
                      console.log("first");
                      defDateHandler(event);
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
                  <span className="add-noti-span">Add Notification</span>
                </div>
                <div className="save-btn">
                  <button
                    onClick={() => {
                      setShowForm(!showForm);
                      createEvent({
                        title: "Kichi gote",
                        date: "2022-05-10",
                        start: "10:00",
                        end: "12:00",
                        user: "robin007hill@gmail.com",
                      });
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
