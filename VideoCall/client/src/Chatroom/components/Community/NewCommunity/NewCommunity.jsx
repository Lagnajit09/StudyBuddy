import React, { useState } from "react";
import "./NewCommunity.css";
import { FaArrowLeft } from "react-icons/fa";

const NewCommunity = (props) => {
  const [communityName, setCommunityName] = useState("");
  const [communityDesc, setCommunityDesc] = useState("");

  return (
    <div
      className="newCommunity"
      style={{ left: props.open ? "0px" : "-323px" }}
    >
      <div className="newCommunity-header">
        <FaArrowLeft
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.setOpen(!props.open);
            setCommunityDesc("");
            setCommunityName("");
          }}
        />
        <p>New Community</p>
      </div>
      <form>
        <div className="newCommunity-image">
          <div></div>
        </div>
        <div className="newCommunity-name">
          <p>Community Name</p>
          <input
            type="text"
            value={communityName}
            placeholder="Enter Community Name"
            onChange={(e) => {
              setCommunityName(e.target.value);
            }}
          />
        </div>
        <div className="newCommunity-desc">
          <p>Community Description</p>
          <textarea
            onChange={(e) => {
              setCommunityDesc(e.target.value);
            }}
          ></textarea>
        </div>
        <button
          style={
            !communityName || !communityDesc
              ? { backgroundColor: "lightgray", cursor: "no-drop" }
              : {}
          }
          disabled={!communityName || !communityDesc ? true : false}
        >
          <FaArrowLeft
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "10px",
            }}
          />
        </button>
      </form>
    </div>
  );
};

export default NewCommunity;
