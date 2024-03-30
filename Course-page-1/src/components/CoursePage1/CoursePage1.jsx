import "./CoursePage1.css";
import Platform from "../CoursePage1/Platform/Platform";
import Topic from "../CoursePage1/Topic/Topic";
import CourseDest from "../CoursePage1/CourseDest/CourseDest";
import TopicSlider from "../CoursePage1/TopicSlider/TopicSlider";

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
