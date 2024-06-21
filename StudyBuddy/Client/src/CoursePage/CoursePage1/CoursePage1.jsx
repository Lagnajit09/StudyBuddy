import "./CoursePage1.css";
import { course_name } from "../CoursePage1/coursepageSlider2";
import Platform from "./components/Platform/Platform";
import Topic from "./components/Topic/Topic";
import CourseDest from "./components/CourseDest/CourseDest";
import TopicSlider from "./components/TopicSlider/TopicSlider";
import { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import NavBar from "../../NavBar/NavBar";
import SearchBar from "../../NavBar/SearchBar/SearchBar";
import AuthModal from "../../Modal/AuthModal";
import { Link, useNavigate } from "react-router-dom";
import { authUserAtom } from "../../store/authAtom";
import { useRecoilValue } from "recoil";

function CoursePage1() {
  const authUser = useRecoilValue(authUserAtom);
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const toggleLoginModal = () => {
    setLoginModal(!loginModal);
    if (loginModal) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const toggleSignupModal = () => {
    setSignupModal(!signupModal);
    if (signupModal) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  };
  return (
    <>
      <AuthModal
        toggleLoginModal={toggleLoginModal}
        toggleSignupModal={toggleSignupModal}
        loginModal={[loginModal, setLoginModal]}
        signupModal={[signupModal, setSignupModal]}
      />
      <NavBar
        toggleLoginModal={toggleLoginModal}
        toggleSignupModal={toggleSignupModal}
      >
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
            placeholder="Search Courses"
          />
          <p
            onClick={() => {
              authUser.user
                ? navigate("/chatroom/community")
                : toggleSignupModal();
            }}
          >
            Chat Room
          </p>
          <p
            onClick={() => {
              authUser.user ? navigate("/note") : toggleSignupModal();
            }}
          >
            Notes
          </p>
        </div>
      </NavBar>
      <Platform />
      <div className="coursepage-text">
        <span id="c-text1">
          Discover endless learning with diverse subjects
        </span>
        <span id="c-text2">
          Explore a world of knowledge across all subjects, tailored for every
          learner.
        </span>
      </div>
      <Topic toggleSignupModal={toggleSignupModal} />
      <div className="coursepage-text">
        <span id="c-text1">All the best courses in one place</span>
        <span id="c-text2">
          Unlock your potential with thousands of courses from top platforms,
          trusted by millions.
        </span>
      </div>
      <CourseDest />
      <TopicSlider
        arr={course_name}
        text="Best Courses"
        toggleSignupModal={toggleSignupModal}
      />
      <Footer toggleSignupModal={toggleSignupModal} />
    </>
  );
}

export default CoursePage1;
