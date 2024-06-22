import React, { useMemo, useState } from "react";
import "./ChatUserDetails.css";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { chatMessageAtom, currentChatAtom, newMessageAtom } from "../../../../store/chatroomStore/chatStore";
import { useRecoilValue } from "recoil";
import AllMedia from "./AllMedia";
import AllFiles from "./AllFiles";

const ChatUserDetails = (props) => {
  const currentChat = useRecoilValue(currentChatAtom);
  const messages = useRecoilValue(chatMessageAtom)
  const newMessages = useRecoilValue(newMessageAtom)
  const [viewAllMedia, setViewAllMedia] = useState(false)
  const [viewAllFiles, setViewAllFiles] = useState(false)

  const media = useMemo(() => {
    let newArr = messages.filter((msg) => msg.file.type.startsWith('image/'))
    newArr = [...newArr, ...newMessages.filter((msg) => msg.file.type.startsWith('image/'))]
    return newArr
  }, [messages, newMessages])

  const files = useMemo(() => {
    let newArr = messages.filter((msg) => (msg.type === 'doc' && !msg.file.type.startsWith('image/')))
    newArr = [...newArr, ...newMessages.filter((msg) => (msg.type === 'doc' && !msg.file.type.startsWith('image/')))]
    return newArr
  }, [messages, newMessages])

  const fileName = (name) => (
    (name.split('.')[0].length > 10 ? `${name.split('.')[0].slice(0,10)}...` : name.split('.')[0]) + `.${name.split('.')[1]}`
  )

  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1048576) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / 1048576).toFixed(2)} MB`;
    }
  };

  const downloadFile = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.target = '_blank'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div
      className="chatUser-details"
      style={props.open ? { right: "0" } : null}
    >
      {viewAllMedia && !viewAllFiles && 
          <AllMedia docs={media} setViewAllMedia={setViewAllMedia} setViewAllFiles={setViewAllFiles} />
      }
      {!viewAllMedia && viewAllFiles && 
          <AllFiles docs={files} setViewAllMedia={setViewAllMedia} setViewAllFiles={setViewAllFiles} />
      }
      <div className="chatUser-header">
        <h3>Details</h3>
        <button
          className="chatUser-details-button"
          onClick={() => {
            props.setOpen(false);
          }}
        >
          <CloseIcon style={{ width: "20px", height: "20px" }} />
        </button>
      </div>
      <div className="chatUser-name">
        <Avatar
          src={currentChat.firstname}
          alt={currentChat.firstname}
          sx={{
            width: "75px",
            height: "75px",
            backgroundColor: currentChat.profile_pic,
            fontSize: "40px",
          }}
        />
        <h3>{`${currentChat.firstname} ${currentChat.lastname}`}</h3>
      </div>
      <div className="chatUser-about">
        <h4>About</h4>
        <p>{currentChat.bio}</p>
      </div>
      {/* <div className="chatUser-mCommunity">
        <h4>Mutual Community</h4>
        <button className="chatUser-details-button">
          <KeyboardArrowRightIcon style={{ width: "25px", height: "25px" }} />
        </button>
      </div> */}
      <div className="chatUser-media">
        <div className="chatUser-media-h">
          <p>Uploaded Media</p>
          {media.length > 5 &&
            <span 
              onClick={() => {
                setViewAllMedia(true); 
                setViewAllFiles(false);
              }}
            >
              View all
            </span>
          }
        </div>
        <div className="chatUser-media-m">
        {
          media.map((item) => (
            <img
             src={item?.file.url} 
             alt={item?.file.name} 
             style={{width: '50px', height:'50px', objectFit: 'contain', border: '1px solid gray', borderRadius: '4px', cursor:'pointer'}} 
             onClick={()=>downloadFile(item?.file.url, item?.file.name)}
            />
          ))
        }
          
        </div>
      </div>
      <div className="chatUser-files">
        <div className="chatUser-media-h">
          <p>Uploaded Files</p>
          {files.length > 4 &&
            <span 
              onClick={() => {
                setViewAllMedia(false); 
                setViewAllFiles(true);
              }}
            >
              View all
            </span>
          }
        </div>
        <div className="chatUser-files-m">
        {
          files.map((item) => (
            <div className="userFile" onClick={()=>downloadFile(item?.file.url, item?.file.name)}>
              <div className="fileIcon">
                <DescriptionIcon style={{ width: "25px", height: "25px" }} />
              </div>
              <div className="chatUser-fileDetails">
                <p>{fileName(item?.file.name)}</p>
                <span>{formatFileSize(item?.file.size)}</span>
              </div>
            </div>
          ))
        } 
        </div>
      </div>
    </div>
  );
};

export default ChatUserDetails;
