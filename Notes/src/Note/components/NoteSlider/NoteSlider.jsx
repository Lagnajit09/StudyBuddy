import React, { useState } from "react";
import "./NoteSlider.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import NewNote from "../NewNote/NewNote";
import { cards as cards1 } from "../../Folder";
import { cards as cards2 } from "../../Notes";
import { MdOutlineFolderOpen } from "react-icons/md";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { PiNotePencilBold } from "react-icons/pi";
import ThreeDotsHor from "../../../assets/Icons/ThreeDotsHor.svg";
import ThreeDotsVer from "../../../assets/Icons/ThreeDotsVer.svg";

const NoteSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextClickCount, setNextClickCount] = useState(0);
  const cards = [];
  props.useFolderCards === "true"
    ? cards.push(...cards1)
    : cards.push(...cards2);
  let style = {};
  if (props.useFolderCards === "false") {
    style = {
      noteSlider: {
        height: "60%",
      },
      cardSlider: {
        height: "100%",
      },
      sliderWrapper: {
        height: "95%",
      },
    };
  }

  const nextSlide = () => {
    if (nextClickCount < 6) {
      const nextIndex = currentIndex + 1 >= cards.length ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      setNextClickCount((prevCount) => prevCount + 1);
    }
  };

  const prevSlide = () => {
    if (nextClickCount > 0) {
      const prevIndex =
        currentIndex - 1 < 0 ? cards.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setNextClickCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className="note-slider" style={style.noteSlider}>
      <div className="card-slider" style={style.cardSlider}>
        <span>{props.heading}</span>
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 25}%)`,
            ...style.sliderWrapper,
          }}
        >
          {props.useFolderCards === "true"
            ? cards1.map((card, index) => (
                <div
                  key={index}
                  className="card-folder"
                  style={{ backgroundColor: card.color }}
                >
                  <div className="card-folder-icons">
                    <MdOutlineFolderOpen
                      style={{
                        fontSize: "50",
                        color: "rgba(255, 255, 255, 1)",
                      }}
                    />
                    {/* <MoreHorizRoundedIcon style={{ fontSize: "30" }} /> */}
                    <img src={ThreeDotsVer} alt="" />
                  </div>
                  <div className="card-folder-desc">
                    <h5>{card.folderName}</h5>
                    <h6>{card.date}</h6>
                  </div>
                </div>
              ))
            : cards2.map((card, index) => (
                <div
                  key={index}
                  className="card-note"
                  style={{ backgroundColor: card.color }}
                >
                  <div className="sub-card-note-1">
                    <div className="card-note-title">
                      <h6>{card.date}</h6>
                      <h5>{card.noteName}</h5>
                    </div>
                    <PiNotePencilBold
                      style={{
                        fontSize: "20",
                        color: "rgba(255, 255, 255, 1)",
                      }}
                    />
                  </div>
                  <div className="sub-card-note-2">
                    <h5>{card.desc}</h5>
                  </div>
                  <div className="sub-card-note-3">
                    <div className="card-note-clock">
                      <AccessTimeRoundedIcon style={{ fontSize: "20" }} />
                      <h6>{card.time}</h6>
                    </div>
                    {/* <div className="three-dots-hor"> 
                     <MoreVertRoundedIcon style={{ fontSize: "30" }} /> 
                     </div> */}
                    <img src={ThreeDotsHor} alt="" />
                  </div>
                </div>
              ))}
        </div>
        <div
          onClick={prevSlide}
          className="prev-button"
          style={{
            color: nextClickCount === 0 ? "#ccc" : "inherit",
            cursor: nextClickCount === 0 ? "not-allowed" : "pointer",
          }}
        >
          <ArrowBackIosNewRoundedIcon style={{ fontSize: "20" }} />
        </div>
        <div
          onClick={nextSlide}
          className="next-button"
          style={{
            color: nextClickCount === 6 ? "#ccc" : "inherit",
            cursor: nextClickCount === 6 ? "not-allowed" : "pointer",
          }}
        >
          <ArrowForwardIosRoundedIcon style={{ fontSize: "20" }} />
        </div>
        <button>SEE ALL</button>
      </div>
      <div className="create-card-container">{

      }
        
      </div>
    </div>
  );
};

export default NoteSlider;
