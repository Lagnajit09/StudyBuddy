import "./CoursePage1.css";
import Platform from "../components/Platform/Platform";
import Topic from "../components/Topic/Topic";
import CourseDest from "../components/CourseDest/CourseDest";
import TopicSlider from "../components/TopicSlider/TopicSlider";

function CoursePage1() {
  return (
    <>
      {/* <NavBar>
        <h2>Study Buddy.</h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" />
        <p>Chat Room</p>
        <p>Notes</p>
        <div className="buttons">
          <button id="login">Login</button>
          <button id="signup">Signup</button>
        </div>
      </NavBar> */}
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
      <TopicSlider />
      {/* <Footer /> */}
    </>
  );
}

export default CoursePage1;
