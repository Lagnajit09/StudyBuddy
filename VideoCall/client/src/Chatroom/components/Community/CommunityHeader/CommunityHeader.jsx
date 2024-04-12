import React from "react";
import "./CommunityHeader.css";
import Search from "@mui/icons-material/Search";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";

const CommunityHeader = ({
  from,
  setDetailsBtnClicked,
  current,
  detailsBtnClicked,
}) => {
  return (
    <div className="chat-header">
      <div className="header-left">
        <Avatar
          sx={{
            bgcolor: current.image || current.profile_pic,
            width: "39px",
            height: "39px",
          }}
          alt={current.name || current.firstName}
          src="/broken-image.jpg"
        />
        <h3>{`${
          from === "community"
            ? current.name
            : current.firstName + " " + current.lastName
        }`}</h3>
      </div>
      <div className="header-right">
        {!(from === "community") && (
          <>
            <span>
              <PhoneOutlinedIcon />
            </span>
            <span>
              <VideocamOutlinedIcon />
            </span>
          </>
        )}
        <span>
          <Search />
        </span>
        <span
          onClick={() => {
            setDetailsBtnClicked(!detailsBtnClicked);
          }}
        >
          <MoreVertIcon />
        </span>
      </div>
    </div>
  );
};

export default CommunityHeader;
