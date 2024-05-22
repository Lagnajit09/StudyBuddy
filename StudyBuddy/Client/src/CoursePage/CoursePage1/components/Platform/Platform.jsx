import React, { useState, useEffect } from "react";
import "./Platform.css";
import Youtube from "../../../../assets/Images/MainPlatforms/Youtube.svg";
import Coursera from "../../../../assets/Images/MainPlatforms/Coursera.svg";
import Udemy from "../../../../assets/Images/MainPlatforms/Udemy.svg";
import Tutorialspoint from "../../../../assets/Images/MainPlatforms/Tutorialspoint.svg";
import GFG from "../../../../assets/Images/MainPlatforms/GFG.svg";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const Platform = () => {
  const [images] = useState([Youtube, Coursera, Udemy, Tutorialspoint, GFG]);
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

  useEffect(() => {
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
