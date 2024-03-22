import React from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  return (
    <div className="searchBar">
      <form className="nosubmit">
        <input
          className={`nosubmit ${props.className}`}
          type="text"
          placeholder="Search Chat Room"
        />
      </form>
    </div>
  );
};

export default SearchBar;

// <div className="searchBar">
//   <link
//     rel="stylesheet"
//     href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
//   />
//   <label for="search-input">
//     <span class="material-symbols-outlined">search</span>Search Chat Room
//   </label>
//   <input id="search-input" type="text" placeholder="Search Chat Room" />
// </div>
