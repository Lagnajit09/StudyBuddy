import React, { useEffect } from "react";
import LandingPage from "./LandingPage/LandingPage";
import CoursePage1 from "./CoursePage/CoursePage1/CoursePage1";
import CoursePage2 from "./CoursePage/CoursePage2/CoursePage2";
import CourseAboutPage from "./CoursePage/CourseAbout/CourseAboutPage";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import { authUserAtom } from "./store/authAtom";
import Profile from "./Profile/Profile";
import Settings from "./Profile/Settings/Settings";
import HelpCenter from "./Profile/HelpCenter/HelpCenter";
import Chatroom from "./Chatroom/Chatroom";
import Note from "./Note/Note";
import TipTap from "./Note/components/Editor/TipTap";
import { BASE_URL } from "./config";

const App = () => {
  const [userAtom, setUserAtom] = useRecoilState(authUserAtom);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (userId) {
        try {
          const response = await fetchUserFromServer(userId, token); // Function to fetch user details from server
          setUserAtom({ user: response, token, userId }); // Assuming response is an object containing user details
          navigate(location.pathname);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [setUserAtom]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/courses" element={<CoursePage1 />}></Route>
      <Route path="/courses/:topic" element={<CoursePage2 />}></Route>
      <Route path="/courses/about" element={<CourseAboutPage />}></Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<HelpCenter />} />
      {/* CHATROOM ROUTES */}
      <Route path="/chatroom/chat" element={<Chatroom />} /> */
      <Route path="/chatroom/chat/:userId" element={<Chatroom />} />
      <Route path="/chatroom/community" element={<Chatroom />} />
      <Route path="/chatroom/community/:id" element={<Chatroom />} />
      {/* NOTE ROUTES */}
      <Route path="/note" element={<Note />}></Route>
      <Route path="/note/folders" element={<Note />}></Route>
      <Route path="/note/notes" element={<Note />}></Route>
      <Route path="/note/:folderid" element={<Note />}></Route>
      <Route path="/note/new" element={<TipTap />}></Route>
      <Route path="/note/content/:noteid" element={<TipTap />}></Route>
      <Route path="/note/trash/folder" element={<Note />}></Route>
      <Route path="/note/trash/note" element={<Note />}></Route>
      <Route path="/note/archive/folder" element={<Note />}></Route>
      <Route path="/note/archive/note" element={<Note />}></Route>
      <Route path="/note/topic/:topicid" element={<Note />}></Route>
    </Routes>
  );
};

const fetchUserFromServer = async (userId, token) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return response.json();
};

export default () => (
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);
