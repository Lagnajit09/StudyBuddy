import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import NavBar from "../NavBar/NavBar";
import TextHeader from "./Components/TextHeader/TextHeader";
import MainImage from "./Components/MainImage/MainImage";
import SocialPlatform from "./Components/SocialPlatfom/SocialPlatform";
import MiddleText from "./Components/MiddleText/MiddleText";
import Features from "./Components/Features/Features";
import Testimonials from "./Components/Testimonials/Testimonials";
import ReviewComponent from "./Components/ReviewsComponents/ReviewComponent";
import FooterComponent from "./Components/FooterRegister/FooterComponent";
import Footer from "../Footer/Footer";
import AuthModal from "../Modal/AuthModal";
import { Link } from "react-router-dom";

function LandingPage() {
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
        style={false}
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
      <TextHeader />
      <MainImage />
      <SocialPlatform />
      <MiddleText />
      <Features />
      <Testimonials />
      <ReviewComponent />
      <FooterComponent
        setSignupModal={setSignupModal}
        signupModal={signupModal}
      />
      <Footer />
    </>
  );
}

export default LandingPage;
