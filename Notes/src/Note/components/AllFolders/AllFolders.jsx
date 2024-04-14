import React from "react";
import "./AllFolders.css";
import { folderUserAtom } from "../../../NoteStore/folderStore";
import { useRecoilValue } from "recoil";
import Folders from "../Folders/Folders";

const AllFolders = () => {
  const folders = useRecoilValue(folderUserAtom);

  return (
    <div className="all-folders">
      {folders.map((card, index) => (
        <div className="folder">
          
          <Folders card={card} index={index} />
        </div>
      ))}
    </div>
  );
};

export default AllFolders;
