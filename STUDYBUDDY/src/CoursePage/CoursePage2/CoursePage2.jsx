import React, { useEffect } from "react";
import "./CoursePage2.css";
import TopicSlider from "./components/TopicSlider/TopicSlider";
import SocialPlatformBar from "./components/SocialPlatformBar/SocialPlatformBar";
import { useLocation, useNavigate } from "react-router-dom";

const CoursePage2 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
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
