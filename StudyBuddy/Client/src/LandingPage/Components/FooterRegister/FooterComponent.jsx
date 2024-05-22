import React from "react";
import "./FooterComponent.css";
import FooterImg from "../../../assets/homepage_imgs/Footer-images/footer_img.svg";
import { useNavigate } from "react-router-dom";

function FooterComponent(props) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  return (
    <div className="footer-div">
      <div className="footer-img-div">
        <div
          className="footer-button-container"
          onClick={() => {
            if (userId) {
              navigate("/profile");
            } else {
              props.setSignupModal(!props.signupModal);
            }
          }}
        >
          <button className="footer-button">
            {userId ? "Profile" : "Register Now"}
          </button>
        </div>
        <img src={FooterImg} alt="footer-img" className="footer-img" />
      </div>
    </div>
  );
}

export default FooterComponent;
