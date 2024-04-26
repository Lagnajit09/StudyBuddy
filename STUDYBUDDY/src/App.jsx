import React from "react";
import LandingPage from "./LandingPage/LandingPage";
import CoursePage1 from "./CoursePage/CoursePage1/CoursePage1";
import CoursePage2 from "./CoursePage/CoursePage2/CoursePage2";
import CourseAboutPage from "./CoursePage/CourseAbout/CourseAboutPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursePage1 />}></Route>
          <Route path="/courses/:topic" element={<CoursePage2 />}></Route>
          <Route path="/courses/about" element={<CourseAboutPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
