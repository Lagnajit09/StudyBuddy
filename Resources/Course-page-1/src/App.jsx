import React from "react";
import CoursePage1 from "./CoursePage1/components/CoursePage1";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CoursePage1 />
      </BrowserRouter>
    </>
  );
};

export default App;
