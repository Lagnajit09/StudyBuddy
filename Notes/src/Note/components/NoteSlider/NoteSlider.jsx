import React, { useState } from "react";
import "./NoteSlider.css";
import { folderUserAtom } from "../../../NoteStore/folderStore";
import { noteUserAtom } from "../../../NoteStore/noteStore";
import { useRecoilValue } from "recoil";
import NewNote from "../NewNote/NewNote";
import Folders from "../Folders/Folders";
import Notes from "../Notes/Notes";
import NoteSliderButton from "../NoteSliderButton/NoteSliderButton";

const NoteSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards1 = useRecoilValue(folderUserAtom);
  const cards2 = useRecoilValue(noteUserAtom);

  const cards = [];
  props.useFolderCards === "true"
    ? cards.push(...cards1)
    : cards.push(...cards2);

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
        height: "75%",
        marginTop: "25px",
      },
    };
  }

  return (
    <div className="note-slider" style={style.noteSlider}>
      <div className="card-note-slider" style={style.cardSlider}>
        <div className="note-slider-header">
          <span id="card-note-slider-heading">{props.heading}</span>
          {cards.length > 4 ? (
            <NoteSliderButton
              useFolderCards={props.useFolderCards}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          ) : null}
        </div>
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 25}%)`,
            ...style.sliderWrapper,
          }}
        >
          {props.useFolderCards === "true"
            ? cards1.map((card, index) => {
                return <Folders card={card} index={index} />;
              })
            : cards2.map((card, index) => {
                return <Notes card={card} index={index} />;
              })}
        </div>
      </div>
      <div className="create-card-container">
        {props.useFolderCards === "true" ? (
          <NewNote
            icon="true"
            caption="New Folder"
            from="folder"
            setNewFolder={props.setNewFolder}
          />
        ) : (
          <NewNote icon="false" caption="New Note" from="note" />
        )}
      </div>
    </div>
  );
};

export default NoteSlider;
