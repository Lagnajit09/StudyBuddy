import "./ProfileMiddle.css";
import ProfileRight from "../ProfileRight/ProfileRight";
import { useState } from "react";
import TopicSlider from "../TopicSlider/TopicSlider";
const ProfileMiddle = () => {
  const [openRight, setOpenRight] = useState(false);

  return (
    <div className="profile-middle">
      <div className="profileMiddle-container">
        <TopicSlider text="My Courses" from="profile" />
        <TopicSlider text="Recommended Courses" from="profile" />
      </div>
      <div
        className="profileMiddle-extra"
        style={{ right: openRight ? "0%" : "-24%" }}
      >
        <ProfileRight open={openRight} setOpen={setOpenRight} />
      </div>
    </div>
  );
};

export default ProfileMiddle;
