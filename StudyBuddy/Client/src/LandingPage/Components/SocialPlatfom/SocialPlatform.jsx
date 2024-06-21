import React from "react";
import "./SocialPlatform.css";
import PlatformImg from "../../../assets/homepage_imgs/landingpage-img2.svg";
function SocialPlatform() {
  return (
    <div className="social-platform-div">
      <img
        src={PlatformImg}
        alt="social-platform"
        className="social-platform"
      />
    </div>
  );
}

export default SocialPlatform;
