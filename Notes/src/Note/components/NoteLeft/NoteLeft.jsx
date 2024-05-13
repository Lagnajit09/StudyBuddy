import { useEffect, useMemo, useState } from "react";
import "./NoteLeft.css";
import { useLocation, useNavigate } from "react-router-dom";
import { topicAtom } from "../../../NoteStore/Topic";
import { useRecoilValue } from "recoil";
import { CiStickyNote } from "react-icons/ci";
import { PiArchive } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiNotebook } from "react-icons/pi";
import { LuChevronUp } from "react-icons/lu";
import { LuChevronDown } from "react-icons/lu";
import { LiaStickyNoteSolid } from "react-icons/lia";
import { FaRegFolderOpen } from "react-icons/fa";
import OpenCloseIcon from "../../../assets/Icons/openCloseIcon.svg";
import Bio from "../../../assets/Icons/Biology.svg";
import Chem from "../../../assets/Icons/Chemistry.svg";
import Phy from "../../../assets/Icons/Physics.svg";
import IT from "../../../assets/Icons/IT.svg";
import Cloud from "../../../assets/Icons/Cloud.svg";
import Math from "../../../assets/Icons/Math.svg";

const NoteLeft = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);
  const topic = useRecoilValue(topicAtom);
  const [topicClicked,setTopicClicked]=useState();
  const [topicDropdown, setTopicDropDown] = useState(false);
  const [archiveDropdown, setArchiveDropDown] = useState(false);
  const [trashDropdown, setTrashDropDown] = useState(false);
  

  
  useEffect(() => {
    if (!topicDropdown) {
      document.getElementsByClassName("topic-wrapper")[0].style.height = "4%";
      document.getElementsByClassName("topics-div")[0].style.height = "100%";
      document.getElementsByClassName("topics-list")[0].style.height = "0%";
    } else {
      document.getElementsByClassName("topic-wrapper")[0].style.height = "42%";
      document.getElementsByClassName("topics-div")[0].style.height = "10%";
      document.getElementsByClassName("topics-list")[0].style.height = "90%";
      setArchiveDropDown(false);
      setTrashDropDown(false);
    }
  }, [topicDropdown]);

  useEffect(() => {
    if (!archiveDropdown) {
      document.getElementsByClassName("archive-wrapper")[0].style.height = "4%";
    } else {
      document.getElementsByClassName("archive-wrapper")[0].style.height =
        "16%";
      setTopicDropDown(false);
      setTrashDropDown(false);
    }
  }, [archiveDropdown]);

  useEffect(() => {
    if (!trashDropdown) {
      document.getElementsByClassName("trash-wrapper")[0].style.height = "4%";
    } else {
      document.getElementsByClassName("trash-wrapper")[0].style.height = "16%";
      setArchiveDropDown(false);
      setTopicDropDown(false);
    }
  }, [trashDropdown]);

  return (
    <div className="notesLeft-container">
      <div className="all-div">
        <div className="notes-div">
          <CiStickyNote
            style={{
              height: "20px",
              width: "20px",
              strokeWidth: "1px",
              color: pathname === "/note" ? "#00a9ff" : "#000000",
            }}
          />
          <span
            className="notes-span"
            onClick={() => navigate("/note")}
            style={{
              color: pathname === "/note" ? "#00a9ff" : "#000000",
            }}
          >
            All Notes
          </span>
        </div>
        <div className="topic-wrapper">
          <div className="topics-div"
          style={{color: pathname.includes("/topic") ? "#00a9ff" : "#000000"}}>
            <PiNotebook
              style={{
                height: "20px",
                width: "20px",
                strokeWidth: "5px",
              }}
            />
            <span className="topics-span">Topics</span>
            <div className="topicsDropBtn">
              {/* <img
                src={OpenCloseIcon}
                className="dropbtn"
                onClick={() => {
                  setTopicDropDown(!topicDropdown);
                }}
                style={{ rotate: topicDropdown ? "180deg" : "0deg" }}
              /> */}
              {topicDropdown ? (
                <LuChevronUp
                  style={{ fontSize: "20" }}
                  onClick={() => {
                    setTopicDropDown(!topicDropdown);
                  }}
                />
              ) : (
                <LuChevronDown
                  style={{ fontSize: "20" }}
                  onClick={() => {
                    setTopicDropDown(!topicDropdown);
                  }}
                />
              )}
            </div>
          </div>
          <div className="topics-list">
            <span
              className="Bio-topics"
              style={{ backgroundColor:topicClicked=="Bio"?"#f5f8ff":"#ffffff"}}
              onClick={() => {
                setTopicClicked("Bio");
                navigate(`/note/topic/${topic[0]._id}`, {
                  state:topic[0]
                });
              }}
            >
              <img src={Bio} />
              Biology
            </span>
            <span
              className="Phy-topics"
              style={{ backgroundColor:topicClicked=="Phy"?"#f5f8ff":"#ffffff"}}
              onClick={() => {
                setTopicClicked("Phy");
                navigate(`/note/topic/${topic[1]._id}`, {
                  state:topic[1]
                });
              }}
            >
              <img src={Phy} />
              Physics
            </span>
            <span
              className="Chem-topics"
              style={{ backgroundColor:topicClicked=="Chem"?"#f5f8ff":"#ffffff"}}
              onClick={() => {
                setTopicClicked("Chem");
                navigate(`/note/topic/${topic[2]._id}`, {
                  state:topic[2]
                });
              }}
            >
              <img src={Chem} />
              Chemistry
            </span>
            <span
              className="IT-topics"
              style={{ backgroundColor:topicClicked=="IT"?"#f5f8ff":"#ffffff"}}
              onClick={() => {
                setTopicClicked("IT");
                navigate(`/note/topic/${topic[3]._id}`, {
                  state:topic[3]
                });
              }}
            >
              <img src={IT} />
              IT and Software
            </span>
            <span
              className="Math-topics"
              style={{ backgroundColor:topicClicked=="Math"?"#f5f8ff":"#ffffff"}}
              onClick={() => {
                setTopicClicked("Math");
                navigate(`/note/topic/${topic[4]._id}`, {
                  state:topic[4]
                });
              }}
            >
              <img src={Math} />
              Mathematics
            </span>
            <span
              className="Cloud-topics"
              style={{ backgroundColor:topicClicked=="Cloud"?"#f5f8ff":"#ffffff"}}
              onClick={() => {
                setTopicClicked("Cloud");
                navigate(`/note/topic/${topic[5]._id}`, {
                  state:topic[5]
                });
              }}
            >
              <img src={Cloud} />
              Cloud Computing
            </span>
          </div>
        </div>

        <div className="archive-wrapper">
          <div className="archive-div">
            <PiArchive
              style={{
                height: "20px",
                width: "20px",
                strokeWidth: "5px",
                color: pathname.includes("/archive") ? "#00a9ff" : "#000000",
              }}
            />
            <span
              className="archive-span"
              // style={{
              //   color: pathname.includes("/archive") ? "#00a9ff" : "#000000",
              // }}
            >
              Archive
            </span>
            <div className="archiveDropBtn">
              {/* <img
                src={OpenCloseIcon}
                className="a-dropbtn"
                onClick={() => {
                  setArchiveDropDown(!archiveDropdown);
                }}
                style={{ rotate: archiveDropdown ? "180deg" : "0deg" }}
              /> */}
              {archiveDropdown ? (
                <LuChevronUp
                  style={{ fontSize: "20" }}
                  onClick={() => {
                    setArchiveDropDown(!archiveDropdown);
                  }}
                />
              ) : (
                <LuChevronDown
                  style={{ fontSize: "20" }}
                  onClick={() => {
                    setArchiveDropDown(!archiveDropdown);
                  }}
                />
              )}
            </div>
          </div>
          <div className="archive-list">
            <span
              className="a-folder"
              onClick={() => navigate("/note/archive/folder")}
              style={{
                backgroundColor:
                  pathname === "/note/archive/folder" ? "#f5f8ff" : "#ffffff",
              }}
            >
              <FaRegFolderOpen />
              Folders
            </span>
            <span
              className="a-notes"
              onClick={() => navigate("/note/archive/note")}
              style={{
                backgroundColor:
                  pathname === "/note/archive/note" ? "#f5f8ff" : "#ffffff",
              }}
            >
              <LiaStickyNoteSolid style={{ strokeWidth: "1px" }} />
              Notes
            </span>
          </div>
        </div>

        <div className="trash-wrapper">
          <div className="trash-div">
            <RiDeleteBinLine
              style={{
                height: "20px",
                width: "20px",
                color: pathname.includes("/trash") ? "#00a9ff" : "#000000",
              }}
            />
            <span
              className="trash-span"
              style={{
                color: pathname.includes("/trash") ? "#00a9ff" : "#000000",
              }}
            >
              Trash
            </span>
            <div className="trashDropBtn">
              {/* <img
                src={OpenCloseIcon}
                className="trash-dropbtn"
                onClick={() => {
                  setTrashDropDown(!trashDropdown);
                }}
                style={{ rotate: trashDropdown ? "180deg" : "0deg" }}
              /> */}
              {trashDropdown ? (
                <LuChevronUp
                  style={{ fontSize: "20" }}
                  onClick={() => {
                    setTrashDropDown(!trashDropdown);
                  }}
                />
              ) : (
                <LuChevronDown
                  style={{ fontSize: "20" }}
                  onClick={() => {
                    setTrashDropDown(!trashDropdown);
                  }}
                />
              )}
            </div>
          </div>
          <div className="trash-list">
            <span
              className="t-folder"
              onClick={() => {
                navigate("/note/trash/folder");
              }}
              style={{
                backgroundColor:
                  pathname === "/note/trash/folder" ? "#f5f8ff" : "#ffffff",
              }}
            >
              <FaRegFolderOpen />
              Folders
            </span>
            <span
              className="t-notes"
              onClick={() => {
                navigate("/note/trash/note");
              }}
              style={{
                backgroundColor: pathname === "/note/trash/note" ? "#f5f8ff" : "#ffffff",
              }}
            >
              <LiaStickyNoteSolid style={{ strokeWidth: "1px" }} />
              Notes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteLeft;
