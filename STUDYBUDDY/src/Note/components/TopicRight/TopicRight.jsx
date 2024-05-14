import React, { useEffect, useMemo, useState } from "react";
import NoteSlider from "../NoteSlider/NoteSlider";
import NoContent from "../NoContent/NoContent";
import { useLocation } from "react-router-dom";
import { authUserAtom } from "../../../store/authAtom";
import { useRecoilValue } from "recoil";
import { BASE_URL } from "../../../config";
import { CiStickyNote } from "react-icons/ci";

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
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/note/viewdocsintopic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser.userId,
          topicId: topic._id,
        }),
      });
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
        <NoContent
          icon={<CiStickyNote style={{ color: "#00a9ff", fontSize: "70px" }} />}
          desc="To add a folder or notes to a topic, create a new note or folder in 'All
        Notes' and then add it to the desired topic."
        />
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
