import React, { useEffect, useRef, useState } from "react";
import "./ChatInput.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { authUserAtom } from "../../../../store/authAtom";
import {
  chatUsersAtom,
  currentChatAtom,
  newMessageAtom,
} from "../../../../store/chatroomStore/chatStore";
import EmojiPicker from "emoji-picker-react";
import smileyEmoji from "../../../../assets/chatroom_imgs/emojiPicker.svg";
import attachment from "../../../../assets/chatroom_imgs/attachment.svg";
import { FiSend } from "react-icons/fi";
import { BASE_URL } from "../../../../config";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../../firebase";
import MediaInput from "../../MediaInput/MediaInput";
import CircularProgress from '@mui/material/CircularProgress';

const ChatInput = (props) => {
  const sender = useRecoilValue(authUserAtom);
  const receiver = useRecoilValue(currentChatAtom);
  const [newMessages, setNewMessages] = useRecoilState(newMessageAtom);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [sendClicked, setSendClicked] = useState(false);
  const wrapperRef = useRef(null);
  const [chatUsers, setChatUsers] = useRecoilState(chatUsersAtom);

  // console.log(receiver);
  // console.log(newMessages);

  useEffect(() => {
    const chatId = [sender.userId, receiver.id].join('_');
    const messagesRef = collection(db, 'privateMessages');
  
    // Create a query against the collection with a filter and order
    const q = query(messagesRef, where('chatId', '==', chatId));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort msgs based on timestamp in ascending order
      msgs.sort((a, b) => a.timestamp - b.timestamp);

      setNewMessages(msgs);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });
  
    return () => unsubscribe();
  }, [sender.userId, receiver.id, setNewMessages]);

  // Clean up previous chat messages only on receiver change or first mount
  useEffect(() => {

    const deletePrevDocs = async () => {
      if (receiver.id !== null) {
        const chatId = [sender.userId, receiver.id].join('_');
        const q = query(
          collection(db, 'privateMessages'),
          where('chatId', '==', chatId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
    }
    }
    deletePrevDocs()
  }, [receiver.id, sender.userId]);
  

  const postMessages = async () => {
    if(!message) return
    const apiUrl = `${BASE_URL}/chatroom/chat`;
    const chatId = [sender.userId, receiver.id].join('_');
    const receiverChatId = [receiver.id, sender.userId].join('_');
    const data = {
      chatId,
      userId: sender.userId,
      senderId: sender.userId,
      receiverId: receiver.id,
      content: message,
      timestamp: Date.now(),
      type: 'msg',
      file: {
        name: '',
        url: '',
        size: '',
        type: ''
      }
    };
    const data_receiver = {
      chatId: receiverChatId,
      userId: sender.userId,
      senderId: sender.userId,
      receiverId: receiver.id,
      content: message,
      timestamp: Date.now(),
      type: 'msg',
      file: {
        name: '',
        url: '',
        size: '',
        type: ''
      }
    };
  
    try {
      await addDoc(collection(db, 'privateMessages'), data);
      await addDoc(collection(db, 'privateMessages'), data_receiver);
      console.log("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sender.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  
    updateLastMessage(receiver.id);
    setSendClicked(false);
    setMessage("");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsEmojiOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (sendClicked) {
      postMessages();
    }
  }, [sendClicked]);

  const addNewChatUser = () => {
    const updatedUsers = [
      {
        chatUser: receiver,
        lastMessage: {
          type: file ? 'doc' : 'msg',
          content: message
        },
        lastMsgTime: Date.now()
      },
      ...chatUsers
    ]
    setChatUsers(updatedUsers)
  }

  const updateLastMessage = (userId) => {
    const userIndex = chatUsers.findIndex(
      (user) => user.chatUser.id === userId
    );

    if (userIndex === -1) {
      return addNewChatUser()
    }
    
    let updatedUsers = [...chatUsers];
    updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        lastMessage: {
          type: file ? 'doc' : 'msg',
          content: message
        },
        lastMsgTime: Date.now(),
    };

    updatedUsers.sort(
      (a, b) => new Date(b.lastMsgTime) - new Date(a.lastMsgTime)
    );

    setChatUsers(updatedUsers);
  };

  const handleEmojiPicker = () => { setIsEmojiOpen(!isEmojiOpen);  };

  const emojiClickHandler = (emoji) => {  setMessage((prev) => prev + emoji.emoji); };

  const handleKeyPress = (e) => { if (e.key === "Enter") sendMessage(); };

  const sendMessage = () => {  
    if(!message && !file) return;
    setSendClicked(true);  
    if(file) handleUpload()
  };

  const handleAttachFiles = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setUrl(downloadURL);
          console.log("File available at:", downloadURL);

        const apiUrl = `${BASE_URL}/chatroom/chat/`;
        const chatId = [sender.userId, receiver.id].join('_');
        const receiverChatId = [receiver.id, sender.userId].join('_');
        const data = {
          chatId,
          userId: sender.userId,
          senderId: sender.userId,
          receiverId: receiver.id,
          content: message,
          timestamp: Date.now(),
          type: 'doc',
          file: {
            name: file.name || '',
            url: downloadURL,
            size: file.size || '',
            type: file.type || ''
          }
        };
        const data_receiver = {
          chatId: receiverChatId,
          userId: sender.userId,
          senderId: sender.userId,
          receiverId: receiver.id,
          content: message,
          timestamp: Date.now(),
          type: 'doc',
          file: {
            name: file.name || '',
            url: downloadURL,
            size: file.size || '',
            type: file.type || ''
          }
        };
  
        try {
          await addDoc(collection(db, 'privateMessages'), data);
          await addDoc(collection(db, 'privateMessages'), data_receiver);
          console.log("Message sent");
        } catch (error) {
          console.error("Error sending message:", error);
        }

        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sender.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Success");
          })
          .catch((error) => {
            console.error("Error:", error);
          });

          updateLastMessage(receiver.id);

          setFile(null)
          setPreview('')
          setProgress(0)
          setUrl('')
          setSendClicked(false)
        });
      }
    );
  };

  return (
    <div>
      <div className="send-message">
        <div
          className="msg-input"
          style={props.open ? { width: "83%" } : { width: "60%" }}
        >
          {file && <MediaInput file={file} preview={preview} setFile={setFile} setPreview={setPreview} />}

          <span ref={wrapperRef}>
            <EmojiPicker
              open={isEmojiOpen}
              autoFocusSearch={false}
              style={{
                width: "30%",
                height: "400px",
                position: "absolute",
                bottom: "60px",
                left: "20px",
              }}
              searchDisabled={true}
              emojiTooltip={false}
              skinTonesDisabled={true}
              autoFocus={false}
              onEmojiClick={emojiClickHandler}
            />
            <img
              src={smileyEmoji}
              alt="Smiley-Emoji"
              onClick={handleEmojiPicker}
              style={{ width: "20px", height: "20px" }}
            />
          </span>
          <input
            className="send"
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyUp={handleKeyPress}
            placeholder="Write a message"
            autoFocus
          />
          <div className="attachInput">
            <label htmlFor="attachFiles">
              <img
                src={attachment}
                alt="Attach-files"
                onClick={handleAttachFiles}
                style={{
                  cursor: "pointer",
                  marginTop: "5px",
                  width: "20px",
                  height: "20px",
                }}
              />
            </label>
            <input
             type="file" 
             id="attachFiles" 
             style={{ display: "none" }} 
             onChange={handleAttachFiles} 
             accept=".jpg, .jpeg, .png, .gif, .bmp, .webp, .tiff, .svg, .pdf, .doc, .docx, .odt, .txt, .rtf, .csv, .xls, .xlsx, .ppt, .pptx, .css, .html, .json, .js, .jsx, .xml, .md, .yaml, .yml, .ts, .tsx, .java, .cpp, .c, .py, .scss, .env"
            />
          </div>
        </div>
        <button>
        {
          progress ? <CircularProgress /> :
          <div className="send-btn" onClick={sendMessage}>
            <FiSend style={{ fontSize: "17px" }} /> 
          </div>
        }
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
