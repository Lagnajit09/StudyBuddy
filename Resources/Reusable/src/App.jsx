import React from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import SearchBar from "./components/NavBar/SearchBar/SearchBar";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>

      <NavBar>
        <h2>Study Buddy.</h2>
        <p>Courses</p>
        <SearchBar className="searchWidth" />
        <p>Chat Room</p>
        <p>Notes</p>
        <div className="buttons">
          <button id="login">Login</button>
          <button id="signup">Signup</button>
        </div>
      </NavBar>
      <Footer/>

    </>
  );
};

export default App;
