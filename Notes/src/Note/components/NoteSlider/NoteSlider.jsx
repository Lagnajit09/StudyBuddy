import React, { useState } from "react";
import "./NoteSlider.css";
import NewNote from "../NewNote/NewNote";
import Folders from "../Folders/Folders";
import Notes from "../Notes/Notes";
import NoteSliderButton from "../NoteSliderButton/NoteSliderButton";
import { cards as cards1 } from "../../Folder";
import { cards as cards2 } from "../../Notes";

const NoteSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [];
  props.useFolderCards === "true" ? cards.push(...cards1) : cards.push(...cards2);

  let style = {};
  if (props.useFolderCards === "false") {
    style = {
      noteSlider: {
        height: "60%",
        marginTop: "25px",
      },
      cardSlider: {
        height: "100%",
      },
      sliderWrapper: {
        height: "90%",
      },
    };
  }

  return (
    <div className="note-slider" style={style.noteSlider}>
      <div className="card-note-slider" style={style.cardSlider}>
        <div className="note-slider-header">
          <span id="card-note-slider-heading">{props.heading}</span>
          {cards.length>4?<NoteSliderButton
            useFolderCards={props.useFolderCards}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />:null}
        </div>
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 25}%)`,
            ...style.sliderWrapper,
          }}
        >
          {props.useFolderCards === "true" ? <Folders /> : <Notes />}
        </div>
      </div>
      <div className="create-card-container">
        {props.useFolderCards === "true" ? (
          <NewNote icon="true" caption="New Folder" from="folder" />
        ) : (
          <NewNote icon="false" caption="New Note" from="note" />
        )}
      </div>
    </div>
  );
};

export default NoteSlider;
