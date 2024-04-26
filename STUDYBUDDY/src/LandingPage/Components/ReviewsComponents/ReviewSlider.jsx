import React, { useRef, useEffect, useState } from 'react';

function ReviewSlider({ slides }) {
  const sliderTrackRef = useRef(null);
  const [position, setPosition] = useState(-100); // Initial position to show the first slide

  useEffect(() => {
    const slideWidth = sliderTrackRef.current.offsetWidth / slides.length;

    function nextSlide() {
      setPosition((prevPosition) => {
        let newPosition = prevPosition - slideWidth;
        if (newPosition < -(slides.length + 1) * slideWidth) {
          newPosition = -slideWidth;
        }
        return newPosition;
      });
    }

    const interval = setInterval(nextSlide, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="slider-container">
      <div
        className="slider-track"
        ref={sliderTrackRef}
        style={{
          transform: `translateX(${position}px)`,
          transition: 'transform 0.5s ease-in-out',
          width: `${slides.length * 100}%`, // Adjust width to accommodate all slides
        }}
      >
        {slides.map((slide, index) => (
          <div className="review-line1-parent" key={index}>
            <div className="review-line1">{slide}</div>
          </div>
        ))}
        {/* Clone first and last slides for infinite looping */}
        <div className="review-line1-parent">
          <div className="review-line1">{slides[0].name}</div>
        </div>
        <div className="review-line1-parent">
          <div className="review-line1">{slides[slides.length - 1].name}</div>
        </div>
      </div>
    </div>
  );
}

export default ReviewSlider;