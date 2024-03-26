import React, { useState, useEffect } from "react";
import "./Platform.css";
import Image from "../../../assets/Youtube.svg";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const Platform = () => {
  const [images] = useState([Image, Image, Image, Image]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt="slide" className="slide" />
        ))}
      </div>

      <div onClick={prevSlide} className="prev-button">
        <KeyboardArrowLeftRoundedIcon style={{ fontSize: "30" }} />
      </div>
      <div onClick={nextSlide} className="next-button">
        <KeyboardArrowRightRoundedIcon style={{ fontSize: "30" }} />
      </div>
    </div>
  );
};

export default Platform;
