import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ChatInput.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import { db } from "../../../../firebase";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, getDocs } from 'firebase/firestore';

const ChatInput = (props) => {
  const { state } = useLocation();
  const sender = useRecoilValue(authUserAtom);
  const receiver = useRecoilValue(currentChatAtom);
  const [newMessages, setNewMessages] = useRecoilState(newMessageAtom);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [message, setMessage] = useState("");
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

      console.log(msgs)
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
    };
    const data_receiver = {
      chatId: receiverChatId,
      userId: sender.userId,
      senderId: sender.userId,
      receiverId: receiver.id,
      content: message,
      timestamp: Date.now(),
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
        lastMessage: message,
        lastMsgTime: Date.now()
      },
      ...chatUsers
    ]
    console.log(updatedUsers)
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
        lastMessage: message,
        lastMsgTime: Date.now(),
    };

    updatedUsers.sort(
      (a, b) => new Date(b.lastMsgTime) - new Date(a.lastMsgTime)
    );

    // Return the updated chat users array
    setChatUsers(updatedUsers);
  };

  const handleEmojiPicker = () => { setIsEmojiOpen(!isEmojiOpen);  };

  const emojiClickHandler = (emoji) => {  setMessage((prev) => prev + emoji.emoji); };

  const handleKeyPress = (e) => { if (e.key === "Enter") sendMessage(); };

  const sendMessage = () => { setSendClicked(true); };

  const handleAttachFiles = () => {};

  return (
    <div>
      <div className="send-message">
        <div
          className="msg-input"
          style={props.open ? { width: "83%" } : { width: "60%" }}
        >
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
            <input type="file" id="attachFiles" style={{ display: "none" }} />
          </div>
        </div>
        <button>
          <div className="send-btn" onClick={sendMessage}>
            {/* <img src={SendBtn} alt="Send" /> */}
            <FiSend style={{ fontSize: "17px" }} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;


// useEffect(() => {
  //   const handleIncomingMessage = (data) => {
  //     console.log(data);
  //     setNewMessages((prev) => [...prev, data]);
  //     updateLastMessage(sender.userId);
  //     // const exists = chatUsers.some((user) => {
  //     //   console.log(user);
  //     //   console.log(state);
  //     //   return user.chatUser.email === state?.chatUser?.email;
  //     // });
  //     // if (!exists && state) {
  //     //   setChatUsers((prev) => [state, ...prev]);
  //     // }
  //   };

  //   socket.on("message", handleIncomingMessage);

  //   return () => {
  //     socket.off("message", handleIncomingMessage);
  //   };
  // }, [setNewMessages, chatUsers, state]);

  // useEffect(() => {
  //   setNewMessages([]);
  // }, [receiver.id]);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       setIsEmojiOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [wrapperRef]);

  // useEffect(() => {
  //   if (sendClicked) {
  //     postMessages();
  //   }
  // }, [sendClicked]);

  // const postMessages = () => {
  //   const apiUrl = `${BASE_URL}/chatroom/chat`;
  //   const data = {
  //     userId: sender.userId,
  //     senderId: sender.userId,
  //     receiverId: receiver.id,
  //     content: message,
  //     timestamp: Date.now(),
  //   };
  //   console.log(data);
  //   socket.emit("message", {
  //     data,
  //   });
  //   socket.emit("updateChatUsers", {
  //     recipientId: receiver.id,
  //     senderId: sender.userId,
  //   });
  //   fetch(apiUrl, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${sender.token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  //   updateLastMessage(receiver.id);
  //   setSendClicked(false);
  //   setMessage("");
  // };

  // const updateLastMessage = (userId) => {
  //   const userIndex = chatUsers.findIndex(
  //     (user) => user.chatUser.id === userId
  //   );

  //   let updatedUsers = [...chatUsers];

  //   if (userIndex !== -1) {
  //     updatedUsers[userIndex] = {
  //       ...updatedUsers[userIndex],
  //       lastMessage: message,
  //       lastMsgTime: Date.now(),
  //     };
  //   }
  //   updatedUsers.sort(
  //     (a, b) => new Date(b.lastMsgTime) - new Date(a.lastMsgTime)
  //   );

  //   // Return the updated chat users array
  //   setChatUsers(updatedUsers);
  // };

  // const handleEmojiPicker = () => {
  //   setIsEmojiOpen(!isEmojiOpen);
  // };

  // const emojiClickHandler = (emoji) => {
  //   setMessage((prev) => prev + emoji.emoji);
  // };

  // const handleKeyPress = (e) => {
  //   e.key === "Enter" ? sendMessage() : null;
  // };

  // const sendMessage = () => {
  //   setSendClicked(true);
  // };

  // const handleAttachFiles = () => {};

  // // console.log(chatMessages);