import react from "react";
import "./SocialPlatformBar.css";

function SocialPlatformBar(props) {
  const scrollToSlider = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const changeFont = (platform) => {
    return props?.platform.toLowerCase() === platform.toLowerCase()
      ? { fontWeight: "600", color: "black" }
      : { color: "rgba(0,0,0,0.5)" };
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
        style={changeFont("coursera")}
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
          scrollToSlider("tutorialspoint");
        }}
        style={changeFont("tutorialspoint")}
      >
        Tutorials Point
      </span>
    </div>
  );
}

export default SocialPlatformBar;
