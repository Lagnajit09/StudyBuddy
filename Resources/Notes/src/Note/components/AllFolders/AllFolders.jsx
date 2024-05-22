import React from "react";
import "./AllFolders.css";
import { useRecoilValue } from "recoil";
import Folders from "../Folders/Folders";

const AllFolders = (props) => {
  return (
    <div className="all-folders">
      {props.folderUser?.map((card, index) => (
        <div className="folder">
          <Folders card={card} index={index} />
        </div>
      ))}
    </div>
  );
};

export default AllFolders;
