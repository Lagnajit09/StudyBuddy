import "./Profile.css";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../NavBar/SearchBar/SearchBar";
import Avatar from "@mui/material/Avatar";
import ProfileLeft from "./components/ProfileLeft/ProfileLeft";
import ProfileMiddle from "./components/ProfileMiddle/ProfileMiddle";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userCoursesAtom } from "../store/profileStore/profileStore";
import { useEffect } from "react";
import { authUserAtom } from "../store/authAtom";
import { BASE_URL } from "../config";

const Profile = () => {
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useRecoilState(userCoursesAtom);
  const authUser = useRecoilValue(authUserAtom);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const fetchUserCourses = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/user-course/allcourses/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Nerwork error!");
        }

        const data = await response.json();
        console.log(data);

        setUserCourses([...data.courses]);
      } catch (error) {
        console.error("Failed to fetch courses!");
      }
    };
    fetchUserCourses();
  }, []);

  return (
    <>
      <NavBar>
        <h2
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Study Buddy.
        </h2>
        <p
          onClick={() => {
            navigate("/courses");
          }}
        >
          Courses
        </p>
        <SearchBar className="searchWidth" />
        <p
          onClick={() => {
            navigate("/chatroom/community");
          }}
        >
          Chat Room
        </p>
        <p
          onClick={() => {
            navigate("/note");
          }}
        >
          Notes
        </p>
      </NavBar>
      <div className="profile-container">
        <ProfileLeft />
        <ProfileMiddle />
      </div>
    </>
  );
};

export default Profile;
