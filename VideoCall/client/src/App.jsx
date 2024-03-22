import React from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import SearchBar from "./components/NavBar/SearchBar/SearchBar";

const App = () => {
  return (
    <div>
      <NavBar>
        <h2>Study Buddy.</h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" />
        <p>Chat Room</p>
        <p>Notes</p>
        <div className="profile"></div>
      </NavBar>
    </div>
  );
};

export default App;
