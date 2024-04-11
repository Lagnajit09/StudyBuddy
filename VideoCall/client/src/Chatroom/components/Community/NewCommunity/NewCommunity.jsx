import React, { useState } from "react";
import "./NewCommunity.css";
import { FaArrowLeft } from "react-icons/fa";
import { authUserAtom } from "../../../store/authUser";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentCommunityAtom,
  joinedCommunitiesAtom,
} from "../../../store/communityStore";

const NewCommunity = (props) => {
  const authUser = useRecoilValue(authUserAtom);
  const setCurrentCommunity = useSetRecoilState(currentCommunityAtom);
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(
    joinedCommunitiesAtom
  );
  const [communityName, setCommunityName] = useState("");
  const [communityDesc, setCommunityDesc] = useState("");

  const newCommunityHandler = async (event) => {
    event.preventDefault();
    const data = {
      name: communityName,
      description: communityDesc,
      members: [authUser.id],
      created_by: authUser.id,
      image: "#A197FC",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/chatroom/community/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      console.log(json.communityWithmembers[0]);
      setJoinedCommunities([
        ...joinedCommunities,
        json.communityWithmembers[0],
      ]);
      setCurrentCommunity(json.communityWithmembers[0]);
    } catch (error) {
      console.log(error);
    }

    setCommunityDesc("");
    setCommunityName("");
    props.setOpen(!props.open);
  };

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
      <form onSubmit={newCommunityHandler}>
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
