import React from 'react';
import { useRecoilState } from "recoil";
import "./HelpcenterMiddle.css";
import clock from "../../../assets/Icons/ProfileMiddleIcon/ClockIcon.svg";
import bookIcon from "../../../assets/Icons/ProfileMiddleIcon/BookIcon.svg";
import bellIcon from "../../../assets/Icons/ProfileMiddleIcon/BellIcon.svg";
import { openAddEvent,defDate,defSTime,defETime,openCalendarAtom,openCalendarEvent } from "../../../profileStore/profileStore";
import ProfileRight from "../../../Profile/components/ProfileRight/ProfileRight";
import HSearch from"../../../assets/Icons/HelpCenterIcon/HelpSearchIcon.svg";
import {getCurrentDate, defDateHandler} from '../../../helperfunction';

const HelpcenterMiddle = () => {
  const [clicked, setClicked] = useRecoilState(openCalendarAtom);
  const [openRight, setOpenRight] = useRecoilState(openCalendarEvent);
  const [showForm, setShowForm] = useRecoilState(openAddEvent);
  const [selectedDate, setSelectedDate] = useRecoilState(defDate);
  const [inputStartTime, setInputStartTime] = useRecoilState(defSTime);
  const [inputEndTime, setInputEndTime] = useRecoilState(defETime);
  console.log(showForm);
  return (
    <>     
      <div className="helpcentermiddle">
        <div className="helpcenterMiddle-container">
            <div className="helpcenter-content">
                <span className='hc-span1'>Hello, how can we help you?</span>
                <span className='hc-span2'>We’ve listed every questions and answers we could think of, that you might ask.</span>
                <span className='hc-span3'>
                    <input className="h-search"type='text' placeholder='Type any questions you have...'/>
                    <img src={HSearch}  className="h-search-icon"/>
                </span>
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
              <input type="text" placeholder="Add Title" className="addTitle" />
              <div className="time-div">
                <img src={clock} style={{ cursor: "pointer" }} />

                <label htmlFor="eventdate" id="def-date">
                  {getCurrentDate()}
                </label>

                <input
                  type="date"
                  id="eventdate"
                  onClick={() => {
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

                {/* <div className="starttime-dropdown"></div> */}

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

                {/* <div className="endtime-dropdown"></div> */}
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
          className="helpcenterMiddle-extra"
          style={{ right: clicked ? "0%" : "-24.5%" }}
        >
         
            <ProfileRight open={openRight} setOpen={setOpenRight} />
          
        </div>
      </div>
    </>
    
  )
}

export default HelpcenterMiddle;