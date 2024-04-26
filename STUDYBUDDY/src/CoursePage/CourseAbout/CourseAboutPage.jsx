import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CourseHeader from "./Components/CourseHeader/CourseHeader";
import AboutTopic from "./Components/AboutTopic/AboutTopic";
import Requirements from "./Components/Requirements/Requirements";
import TopicSlider from "./Components/TopicSlider/TopicSlider";
import SocialPlatformBar from "./Components/SocialPlatformBar/SocialPlatformBar";
import { ThreeDots } from "react-loader-spinner";

function CourseAboutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading status

  if (!state) {
    useEffect(() => {
      navigate("/courses");
    }, [state]);
    return;
  }

  useEffect(() => {
    // Redirect to courses page if no state is passed
    if (!state) {
      return;
    }
    const fetchAboutRequirements = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const response = await fetch(
          `http://localhost:3000/courses/about/${state.course[state.index].cap}`
        );
        const data = await response.json();
        console.log(data);
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching finishes
      }
    };

    fetchAboutRequirements();
  }, [state, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, [state]);

  return (
    <>
      <SocialPlatformBar platform={state.course[state.index].c_dest} />
      <CourseHeader />
      {/* Show loading indicator if loading is true */}
      {loading ? (
        <div style={{ margin: "3% 45%" }}>
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#00a9ff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        // Render content when loading is false
        <>
          <AboutTopic about={fetchedData.about} />
          <Requirements requirements={fetchedData.requirements} />
          <TopicSlider />
        </>
      )}
    </>
  );
}

export default CourseAboutPage;
