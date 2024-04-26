import React from "react";
import "./FooterComponent.css";
import FooterImg from "../../../assets/homepage_imgs/Footer-images/footer_img.svg";
function FooterComponent(props) {
  return (
    <div className="footer-div">
      <div className="footer-img-div">
        <div
          className="footer-button-container"
          onClick={() => {
            props.setSignupModal(!props.signupModal);
          }}
        >
          <button className="footer-button">Register Now</button>
        </div>
        <img src={FooterImg} alt="footer-img" className="footer-img" />
      </div>
    </div>
  );
}

export default FooterComponent;
