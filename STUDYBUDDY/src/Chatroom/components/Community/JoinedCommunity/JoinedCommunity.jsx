import React, { useEffect } from "react";
import "./JoinedCommunity.css";
import {
  joinedCommunitiesAtom,
  currentCommunityAtom,
} from "../../../../store/chatroomStore/communityStore";
import { useRecoilState, useRecoilValue } from "recoil";
import { IoMdAddCircleOutline } from "react-icons/io";
import { authUserAtom } from "../../../../store/authAtom";
import { Avatar } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../../../config";

const JoinedCommunity = () => {
  const params = useParams();
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(
    joinedCommunitiesAtom
  );
  const [currentCommunity, setCurrentCommunity] =
    useRecoilState(currentCommunityAtom);
  const authUser = useRecoilValue(authUserAtom);

  console.log(joinedCommunities);

  useEffect(() => {
    fetchCommunityById();
  }, [params?.id]);

  useEffect(() => {
    fetchUserCommunities();
  }, [authUser]);

  const fetchCommunityById = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/chatroom/community/searchCommunity/${authUser.userId}/${params?.id}`,
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setCurrentCommunity(responseData[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserCommunities = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/chatroom/community/user-communities/${authUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      // console.log(responseData);
      setJoinedCommunities(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + "...";
    }
  }

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
                    <p>{truncateString(community.lastMessage || "", 30)}</p>
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
