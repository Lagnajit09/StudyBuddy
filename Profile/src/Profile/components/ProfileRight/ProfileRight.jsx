import "./ProfileRight.css";
import OpenCloseIcon from "../../../assets/Icons/ProfileRightIcon/OpenCloseIcon.svg";
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import MyCalender from "./components/Calendar/MyCalender";
import Bio from "../../../assets/Icons/ProfileRightIcon/Biology.svg";
import Chem from "../../../assets/Icons/ProfileRightIcon/Chemistry.svg";
import Arrow from "../../../assets/Icons/ProfileRightIcon/arrow.svg";
import { useRecoilState } from "recoil";
import {openCalendarAtom,openAddEvent} from "../../../profileStore/profileStore"

const ProfileRight = (props) => {
  const [clicked, setClicked] = useRecoilState(openCalendarAtom);
  const [scheduleList, setScheduleList] = useState(false);
  const [searchBar,setSearchBar]=useState(false);
  const [showForm,setShowForm]=useRecoilState(openAddEvent);

  useEffect(() => {
    if (scheduleList) {
      document
        .getElementsByClassName("calender-div")[0]
        .classList.add("modi-calender-div");
    } 
    else {
      document
        .getElementsByClassName("calender-div")[0]
        .classList.remove("modi-calender-div");
    }
  }, [scheduleList]);

  useEffect(()=>{
    if(searchBar){
      document.getElementsByClassName("S-icon-btn")[0].classList.add("s-bar-sIcon");
      document.getElementsByClassName("N-icon-btn")[0].style.display="none";
      if(scheduleList){
        document.getElementsByClassName("s-bar-input")[0].style.padding="3% 15%";
      }
      else{
        document.getElementsByClassName("s-bar-input")[0].style.padding="3% 0% 3% 11.5%";
      }
    }
    else{
      document.getElementsByClassName("S-icon-btn")[0].classList.remove("s-bar-sIcon");
      document.getElementsByClassName("N-icon-btn")[0].style.display="flex";
    }
  },[searchBar,scheduleList])

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
          
           <SearchIcon className="S-icon-btn" onClick={()=>{
            setSearchBar(!searchBar);
           }}/>
           <input type="text" className="s-bar-input" placeholder="Search" style={{display:searchBar?"flex":"none"}}/>
           <NotificationsNoneIcon  className="N-icon-btn"/> 
           < AddIcon className="A-icon-btn" 
           style={{ display: scheduleList ? "none" : "block" }}
           onClick={()=>{
            console.log("form clicked & showform before= "+showForm)
            setShowForm(!showForm);
            console.log("form clicked & showform after= "+showForm)
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
                setScheduleList(!scheduleList);
              }}
              style={{ display: scheduleList ? "block" : "none" }}
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
