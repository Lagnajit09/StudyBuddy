import React from 'react';
import './App.css';
import CourseAboutPage from './CourseAboutPage';
import NavBar from './Components/NavBar/NavBar';
import Avatar from "@mui/material/Avatar";
import SearchBar from './Components/NavBar/SearchBar/SearchBar';
import SocialPlatformBar from './Components/SocialPlatformBar/SocialPlatformBar';


function App() {
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
          sx={{ bgcolor: "#00A9FF" ,width: "30px", height: "30px" }}
        />
      </NavBar>
      <SocialPlatformBar platform="youtube"/>
      <CourseAboutPage/>
    </>
     
  );
};

export default App;
