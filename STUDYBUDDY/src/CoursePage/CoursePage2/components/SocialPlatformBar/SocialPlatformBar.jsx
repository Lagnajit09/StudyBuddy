import react from "react";
import "./SocialPlatformBar.css";

function SocialPlatformBar(props) {
  const scrollToSlider = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const changeFont = (platform) => {
    return props?.platform === platform
      ? { fontWeight: "600", color: "black" }
      : { color: props.from === "Course-page-2" ? "black" : "rgba(0,0,0,0.5)" };
  };

  return (
    <div
      className="social-platforms"
      style={{
        position: props.from === "Course-page-2" ? "fixed" : "relative",
      }}
    >
      <span
        onClick={() => {
          scrollToSlider("youtube");
        }}
        style={changeFont("youtube")}
      >
        YouTube
      </span>
      <span
        onClick={() => {
          scrollToSlider("udemy");
        }}
        style={changeFont("udemy")}
      >
        Udemy
      </span>
      <span
        onClick={() => {
          scrollToSlider("coursera");
        }}
        style={changeFont("cousera")}
      >
        Coursera
      </span>
      <span
        onClick={() => {
          scrollToSlider("geeksforgeeks");
        }}
        style={changeFont("geeksforgeeks")}
      >
        Geeks for Geeks
      </span>{" "}
      <span
        onClick={() => {
          scrollToSlider("tutorials-point");
        }}
        style={changeFont("tutorials-point")}
      >
        Tutorials Point
      </span>
    </div>
  );
}

export default SocialPlatformBar;
