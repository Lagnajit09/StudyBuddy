import "./App.css";
import Profile from "./Profile/Profile";
import Settings from "./Profile/Settings/Settings";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelpCenter from "./Profile/HelpCenter/HelpCenter";

const App=()=>{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<RecoilRoot> <Profile /> </RecoilRoot>}/>
          <Route path="/settings" element={<Settings/>} />
          <Route path="/help" element={<HelpCenter/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
