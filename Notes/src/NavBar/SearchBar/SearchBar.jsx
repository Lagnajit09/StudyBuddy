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

