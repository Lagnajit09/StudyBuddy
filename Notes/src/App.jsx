import "./App.css";
import Note from "./Note/Note";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TipTap from "./Note/components/Editor/TipTap";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/note" element={<Note />}></Route>
            <Route path="/note/folders" element={<Note />}></Route>
            <Route path="/note/notes" element={<Note />}></Route>
            <Route path="/note/:folderid" element={<Note />}></Route>
            <Route path="/note/new" element={<TipTap />}></Route>
            <Route path="/note/content/:noteid" element={<TipTap />}></Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
