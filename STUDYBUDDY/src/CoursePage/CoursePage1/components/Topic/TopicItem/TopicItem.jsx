import React from "react";
import "./TopicItem.css";
import { authUserAtom } from "../../../../../store/authAtom";
import { useRecoilValue } from "recoil";

const TopicItem = (props) => {
  const authUser = useRecoilValue(authUserAtom);

  const topicItemClicked = () => {
    authUser.user ? props.onClick() : props.toggleSignupHandler();
  };

  return (
    <>
      <div className="topic" onClick={topicItemClicked}>
        <div className="topic-img">
          <figure>
            <img src={props.img} alt="Physics" />
          </figure>
        </div>
        <div className="topic-text">{props.text}</div>
      </div>
    </>
  );
};

export default TopicItem;
