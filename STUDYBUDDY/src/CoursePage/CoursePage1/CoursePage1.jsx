import "./CoursePage1.css";
import { course_name } from "../CoursePage1/coursepageSlider2";
import Platform from "./components/Platform/Platform";
import Topic from "./components/Topic/Topic";
import CourseDest from "./components/CourseDest/CourseDest";
import TopicSlider from "./components/TopicSlider/TopicSlider";
import { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import NavBar from "../../NavBar/NavBar";
import AuthModal from "../../Modal/AuthModal";
import { Link, useNavigate } from "react-router-dom";

function CoursePage1() {
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
        <div className="navbar-middle">
          <p
            onClick={() => {
              navigate("/courses");
            }}
          >
            Courses
          </p>
          <p
            onClick={() => {
              navigate("/chatroom");
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
      <Platform />
      <div className="coursepage-text">
        <span id="c-text1">All the best courses in one place</span>
        <span id="c-text2">
          Over 10 crore learners trust us for online and offline coaching.
        </span>
      </div>
      <Topic />
      <div className="coursepage-text">
        <span id="c-text1">All the best courses in one place</span>
        <span id="c-text2">
          Over 10 crore learners trust us for online and offline coaching.
        </span>
      </div>
      <CourseDest />
      <TopicSlider arr={course_name} />
      <Footer />
    </>
  );
}

export default CoursePage1;
