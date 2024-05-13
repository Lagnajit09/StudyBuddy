import React, { useState } from "react";
import "./NoteNavBar.css";
import { RxCross2 } from "react-icons/rx";
import { LuArchive } from "react-icons/lu";
import ThreeDotsVer from "../../../assets/Icons/ThreeDotsVer.svg";

const navabarOpt = [
  "Delete",
  "Add to Topic",
  "Make Folder",
  "Add to Folder",
  "Change colour",
  "Download",
];

const NoteNavBar = () => {
  const [showNavBarDropdown, setShowNavBarDropdown] = useState(false);

  const handleNavbarClick = () => {
    setShowNavBarDropdown(!showNavBarDropdown);
  };

  return (
    <div className="note-navbar">
      <div className="sub-note-navbar-1">
        <RxCross2 style={{ fontSize: "20" }} />
        <span>2 Selected</span>
      </div>
      <div className="sub-note-navbar-2">
        <LuArchive style={{ fontSize: "25", cursor: "pointer" }} />
        <div className="navbar-threedots">
          <img src={ThreeDotsVer} alt="" onClick={() => handleNavbarClick()} />
          {showNavBarDropdown && (
            <div className="navbar-dropdown">
              {navabarOpt.map((item, index) => {
                return (
                  <h6 key={index} className="navbar-dd-h6">
                    {item}
                  </h6>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteNavBar;
