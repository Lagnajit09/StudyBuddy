import React, { useState, useMemo } from "react";
import "./AboutTopicContents.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function formatText(text) {
  // Replace ** with <strong> tags
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  // Replace * with <li> tags
  text = text.replace(/\*(.*?)\*/g, "<li>$1</li>");
  return text;
}

function AboutTopicContents({ about }) {
  const [showMore, setShowMore] = useState(false);
  const [divHeight, setDivHeight] = useState("100px");

  const paragraphContent = useMemo(() => {
    return about;
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setDivHeight(showMore ? "100px" : "auto");
  };

  return (
    <>
      <div
        className="content"
        style={{
          height: divHeight,
          overflow: "hidden",
          transition: "height 0.5s ease",
        }}
      >
        <p
          className="content-paragraph"
          style={{
            boxShadow: !showMore ? "inset 0px -48px 75px 0px #ffffff" : "",
          }}
        >
          {/* {showMore ? paragraphContent : paragraphContent.split('\n').slice(0, 7).join('\n')} */}
          {paragraphContent.split("\n").map((paragraph, index) => {
            return (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: formatText(paragraph) }}
              ></p>
            );
          })}
        </p>

        <div
          className="box-div"
          style={{
            boxShadow: !showMore ? "inset 0px -48px 75px 0px #ffffff" : "",
          }}
        ></div>
      </div>
      {!showMore ? (
        <button className="show-more-less-button" onClick={toggleShowMore}>
          Show More <KeyboardArrowDownIcon />{" "}
        </button>
      ) : (
        <button className="show-more-less-button" onClick={toggleShowMore}>
          Show Less <KeyboardArrowUpIcon />{" "}
        </button>
      )}
    </>
  );
}

export default AboutTopicContents;
