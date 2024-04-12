import React, { useEffect } from "react";
import "./JoinedCommunity.css";
import {
  joinedCommunitiesAtom,
  currentCommunityAtom,
} from "../../../store/communityStore";
import { useRecoilState, useRecoilValue } from "recoil";
import { IoMdAddCircleOutline } from "react-icons/io";
import { authUserAtom } from "../../../store/authUser";
import { Avatar } from "@mui/material";
import { useParams, Link } from "react-router-dom";

const JoinedCommunity = () => {
  const params = useParams();
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(
    joinedCommunitiesAtom
  );
  const [currentCommunity, setCurrentCommunity] =
    useRecoilState(currentCommunityAtom);
  const authUser = useRecoilValue(authUserAtom);

  useEffect(() => {
    fetchCommunityById();
  }, [params?.id]);

  useEffect(() => {
    fetchUserCommunities();
  }, [authUser]);

  const fetchCommunityById = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/chatroom/community/searchCommunity/${params?.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setCurrentCommunity(responseData[0]);
    } catch (error) {
      setError(error);
    }
  };

  const fetchUserCommunities = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/chatroom/community/user-communities/${authUser.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      // console.log(responseData);
      setJoinedCommunities(responseData);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      {joinedCommunities.length ? (
        <div>
          {joinedCommunities.map((community, index) => {
            return (
              <Link
                key={index}
                to={`/chatroom/community/${community._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="joined-community"
                  onClick={() => {
                    setCurrentCommunity(community);
                  }}
                  style={{
                    backgroundColor:
                      currentCommunity._id === community._id
                        ? "#00aaff0d"
                        : "white",
                    transition: "all 0.3s ease",
                    borderRight:
                      currentCommunity._id === community._id
                        ? "3px solid #00A9FF"
                        : null,
                  }}
                >
                  <Avatar
                    src={community.image}
                    alt={community.name}
                    style={{ backgroundColor: community.image }}
                  />
                  <div className="joined-com-right">
                    <h3>{community.name}</h3>
                    <p>{community.description?.slice(0, 25) + "..."}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <IoMdAddCircleOutline className="no-chat" />
        </div>
      )}
    </>
  );
};

export default JoinedCommunity;
