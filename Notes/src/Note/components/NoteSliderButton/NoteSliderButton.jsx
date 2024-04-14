import React, { useState } from "react";
import "./NoteSliderButton.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { cards as cards1 } from "../../Folder";
import { cards as cards2 } from "../../Notes";

const NoteSliderButton = ({
  useFolderCards,
  currentIndex,
  setCurrentIndex,
}) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const navigate = useNavigate();

  const cards = [];
  useFolderCards === "true" ? cards.push(...cards1) : cards.push(...cards2);

  const handlePrevDisable = () => {
    setIsPrevDisabled(true);
  };

  const handleNextDisable = () => {
    setIsNextDisabled(true);
  };

  const nextSlide = () => {
    setIsPrevDisabled(false);
    const nextIndex = currentIndex + 1 >= cards.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    currentIndex === cards.length - 5 ? handleNextDisable() : null;
  };

  const prevSlide = () => {
    setIsNextDisabled(false);
    const prevIndex =
      currentIndex - 1 < 0 ? cards.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    currentIndex === 1 ? handlePrevDisable() : null;
  };

  return (
    <div className="note-buttons">
      <button
        id="see-all"
        onClick={() => {
          useFolderCards === "true"
            ? navigate("/note/folders")
            : navigate("/note/notes");
        }}
      >
        SEE ALL
      </button>
      <button
        onClick={prevSlide}
        disabled={isPrevDisabled}
        className="prev-button"
        style={{
          color: currentIndex === 0 ? "#ccc" : "inherit",
          cursor: currentIndex === 0 ? "not-allowed" : "pointer",
        }}
      >
        <ArrowBackIosNewRoundedIcon style={{ fontSize: "20" }} />
      </button>
      <button
        onClick={nextSlide}
        disabled={isNextDisabled}
        className="next-button"
        style={{
          color: currentIndex === cards.length - 4 ? "#ccc" : "inherit",
          cursor: currentIndex === cards.length - 4 ? "not-allowed" : "pointer",
        }}
      >
        <ArrowForwardIosRoundedIcon style={{ fontSize: "20" }} />
      </button>
    </div>
  );
};

export default NoteSliderButton;
