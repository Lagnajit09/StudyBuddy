import React from "react";
import CoursePage1 from "./components/CoursePage1/CoursePage1";
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
