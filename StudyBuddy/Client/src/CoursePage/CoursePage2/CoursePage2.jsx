import React, { useEffect, useState } from "react";
import "./CoursePage2.css";
import TopicSlider from "./components/TopicSlider/TopicSlider";
import SocialPlatformBar from "./components/SocialPlatformBar/SocialPlatformBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authUserAtom } from "../../store/authAtom";
import { useRecoilValue } from "recoil";
import NavBar from "../../NavBar/NavBar";
import SearchBar from "../../NavBar/SearchBar/SearchBar";

const CoursePage2 = () => {
  const { state } = useLocation();
  const authUser = useRecoilValue(authUserAtom);
  const navigate = useNavigate();

  if (!state || !authUser.user) {
    useEffect(() => {
      navigate("/courses");
    }, [state]);
    return;
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, [state.arr]);

  return (
    <>
      <NavBar>
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          <h2>Study Buddy.</h2>
        </Link>
        <div
          className="cpage-navbar-middle"
          style={{ width: authUser.user ? "75%" : "60%" }}
        >
          <p
            onClick={() => {
              navigate("/courses");
            }}
          >
            Courses
          </p>
          <SearchBar
            className="searchWidth"
            width={authUser.user ? "700px" : "510px"}
          />
          <p
            onClick={() => {
              navigate("/chatroom/community");
            }}
          >
            Chat Room
          </p>
          <p
            onClick={() => {
              navigate("/note");
            }}
          >
            Notes
          </p>
        </div>
      </NavBar>
      <SocialPlatformBar from="Course-page-2" />

      <div className="topic-container">
        <h2 id="course-name-heading">{state.name}</h2>
        <TopicSlider text="YouTube" id="youtube" arr={state.arr.Youtube} />
        <TopicSlider text="Udemy" id="udemy" arr={state.arr.Udemy} />
        <TopicSlider text="Coursera" id="coursera" arr={state.arr.Coursera} />
        <TopicSlider
          text="Geeks for Geeks"
          id="geeksforgeeks"
          arr={state.arr.GeeksForGeeks}
        />
        <TopicSlider
          text="Tutorials point"
          id="tutorials-point"
          arr={state.arr.TutorialsPoint}
        />
      </div>
    </>
  );
};

export default CoursePage2;
