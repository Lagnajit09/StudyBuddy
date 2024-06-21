import React from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  return (
    <div className="searchBar">
      <form className="nosubmit">
        <input
          className={`nosubmit ${props.className}`}
          style={{ width: props.width }}
          type="text"
          placeholder={props.placeholder}
        />
      </form>
    </div>
  );
};

export default SearchBar;
