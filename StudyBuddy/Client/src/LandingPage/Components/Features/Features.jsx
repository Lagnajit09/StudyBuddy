import React from "react";
import "./Features.css";

import feature1 from "../../../assets/homepage_imgs/Features-images/best courses feature.svg";
import feature2 from "../../../assets/homepage_imgs/Features-images/chat room feature.svg";
import feature3 from "../../../assets/homepage_imgs/Features-images/Note taking feature.svg";
import feature4 from "../../../assets/homepage_imgs/Features-images/chat room feature-2.svg";
import feature5 from "../../../assets/homepage_imgs/Features-images/community features.svg";
import feature6 from "../../../assets/homepage_imgs/Features-images/file sharing feature.svg";

function Features() {
  return (
    <div className="features-div">
      <img src={feature1} alt="best-courses" className="best-courses" />
      <img src={feature2} alt="chatroom-1" className="chatroom-1" />
      <img src={feature3} alt="note-taking" className="note-taking" />
      <img src={feature4} alt="chatroom-2" className="chatroom-2" />
      <img
        src={feature5}
        alt="community-features"
        className="community-features"
      />
      <img src={feature6} alt="file-sharing" className="file-sharing" />
    </div>
  );
}

export default Features;
