import React, { useEffect } from "react";
import LandingPage from "./LandingPage/LandingPage";
import CoursePage1 from "./CoursePage/CoursePage1/CoursePage1";
import CoursePage2 from "./CoursePage/CoursePage2/CoursePage2";
import CourseAboutPage from "./CoursePage/CourseAbout/CourseAboutPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import { authUserAtom } from "./store/authAtom";
import Profile from "./Profile/Profile";
import Settings from "./Profile/Settings/Settings";
import HelpCenter from "./Profile/HelpCenter/HelpCenter";

const App = () => {
  const [userAtom, setUserAtom] = useRecoilState(authUserAtom);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (userId) {
        try {
          const response = await fetchUserFromServer(userId); // Function to fetch user details from server
          setUserAtom({ user: response, token, userId }); // Assuming response is an object containing user details
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [setUserAtom]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userAtom.user ? <Profile /> : <LandingPage />}
        />
        <Route path="/courses" element={<CoursePage1 />}></Route>
        <Route path="/courses/:topic" element={<CoursePage2 />}></Route>
        <Route path="/courses/about" element={<CourseAboutPage />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<HelpCenter />} />
      </Routes>
    </BrowserRouter>
  );
};

const fetchUserFromServer = async (userId) => {
  const response = await fetch(`http://localhost:3000/user/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return response.json();
};

export default () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
