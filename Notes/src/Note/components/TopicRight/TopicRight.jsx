import React, { useEffect, useMemo, useState } from "react";
import CreateNote from "../CreateNote/CreateNote";
import NoteSlider from "../NoteSlider/NoteSlider";
import AddToTopic from "../AddToTopic/AddToTopic";
import { useLocation } from "react-router-dom";
import { authUserAtom } from "../../../NoteStore/AuthUser";
import { useRecoilValue } from "recoil";

const TopicRight = (props) => {
  const location = useLocation();
  const authUser = useRecoilValue(authUserAtom);
  const [topicFolders, setTopicFolders] = useState([]);
  const [topicNotes, setTopicNotes] = useState([]);
  const topic = useMemo(() => {
    return location.state;
  }, [location]);

  useEffect(() => {
    const handleViewTopic = async () => {
      const response = await fetch(
        "http://localhost:3000/note/viewdocsintopic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: authUser._id,
            topicId: topic._id,
          }),
        }
      );
      const data = await response.json();
      setTopicFolders(data.folders);
      setTopicNotes(data.notes);
    };
    handleViewTopic();
  }, [topic]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* {topic.folders.length === 0 ? (
        <CreateNote
          heading={`${topic.name} Folder`}
          icon="true"
          caption="New Folder"
          setNewFolder={props.setNewFolder}
        />
      ) : (
        <NoteSlider
          from="topic"
          heading={`${topic.name} Folder`}
          useFolderCards="true"
          topicFolders={topicFolders}
          setNewFolder={props.setNewFolder}
        />
      )}

      {topic.notes.length === 0 ? (
        <CreateNote
          heading={`${topic.name} Note`}
          icon="false"
          caption="New Note"
        />
      ) : (
        <NoteSlider
          from="topic"
          heading={`${topic.name} Note`}
          useFolderCards="false"
          topicNotes={topicNotes}
          setAddToFolder={props.setAddToFolder}
        />
      )} */}

      {topicFolders.length === 0 && topicNotes.length === 0 ? (
        <AddToTopic />
      ) : (
        <>
          {topicFolders.length > 0 && (
            <NoteSlider
              from="topic"
              heading={`${topic.name} Folder`}
              useFolderCards="true"
              topicFolders={topicFolders}
              setNewFolder={props.setNewFolder}
            />
          )}
          {topicNotes.length > 0 && (
            <NoteSlider
              from="topic"
              heading={`${topic.name} Note`}
              useFolderCards="false"
              topicNotes={topicNotes}
              setAddToFolder={props.setAddToFolder}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TopicRight;
