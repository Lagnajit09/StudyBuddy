const Note = require("./noteModel");
const Folder = require(".././Folder/folderModel");
const User = require(".././User/userModel");
const Topic = require(".././Topic/topicModel");

const { deleteNoteDependencies } = require("../User/document-Controller");

//1     Function to Create and Svae a Note // Dont require folder id
exports.saveNote = async (req, res) => {
  try {
    const { title, content, contentText, folderId, topicId, userId } = req.body;
    console.log(req.body);
    const user = await User.findById(userId); //find user
    const note = await Note.findOne({ title: title, created_by: userId }); //find if note exists with same title anywhere(by the user)

    let topic_id = null; //to be updated in DB
    let folder_id = null; //to be updated in DB
    let folder;
    let topic;

    if (folderId && topicId) {
      //If any one is giving both topicID and folderId //not possible from frontend
      return res.status(450).json({
        message: "Provide either folderId or topicId, not both",
      });
    }

    if (note) {
      //If note exists //But still we have to check as there are 3 things- Folder, Topic, Outside of Both

      if (folderId) {
        //wishing to create a note inside a folder
        folder = await Folder.findOne({ created_by: userId, _id: folderId }); //find folder
        const noteInFolder = await Note.findOne({
          created_by: userId,
          folder_id: folderId,
          title,
        }); //If note with same name exists in folder
        if (noteInFolder) {
          if (noteInFolder.deleted || noteInFolder.archived) {
            //If virtually exists in trash or archives
            return res.status(430).json({
              message:
                "Note with same name from this folder already exist, check trash or archives",
            });
          } else {
            //If physically exists
            return res
              .status(428)
              .json({ message: "Note already exists in the folder" });
          }
        }
        //If doesnt exists great move on
        topic_id = folder.topic_id; //set the topic_id to be updated= the topic_id of the folder to which note is going to be added // can be null too if folder is not in any topic
        folder_id = folderId; //set the folder_id to be updated in Db= folder's id
        topic = await Topic.findOne({ created_by: userId, _id: topic_id }); //this topic needs to be updated lated if the folder was in a topic //so better fetch now
      } else if (topicId) {
        //Wishing to create a note in a topic //not in any folder
        topic = await Topic.findOne({ created_by: userId, _id: topicId }); //Find the topic
        const f = topic.folders; //get the array of ids of the folder that already exist in the topic
        const folderInTopic = f.filter((item) => item.toString()); //just converting it from array of objects to array of strings
        const noteInTopic = await Note.findOne({
          //Check if any note is present in the topic but not in any folder
          created_by: userId,
          topic_id: topicId,
          folder_id: { $nin: folderInTopic },
        });
        if (noteInTopic) {
          //If exists
          if (noteInTopic.deleted || noteInTopic.archived) {
            //Virtually
            return res.status(420).json({
              message:
                "Note with same name from this topic already exist, check trash or archives",
            });
          } else {
            //Physically
            return res
              .status(418)
              .json({ message: "Note already exists in the topic" });
          }
        }
        topic_id = topicId; //set the topic_id to be updated in Db = the topicId given by the user
      } else {
        //Wanna create a note outside //not in any folder or in any topic   //in this case the topic_id and folder_id will remain null as declared earlier
        const existingNote = await Note.findOne({
          created_by: userId,
          folder_id: null,
          topic_id: null,
          title: title,
        }); //If note with same name exist at same location
        if (existingNote) {
          if (existingNote.deleted || existingNote.archived) {
            //virtually
            return res.status(410).json({
              message:
                "Note with same name already exist, check trash or archives",
            });
          } else {
            //physically
            return res.status(408).json({ message: "Note already exists" });
          }
        }
      }
    } else {
      //In case note with that name and user_id didn't exist in the DB- //so uper ka itna code mein kyun jana
      if (folderId) {
        //Wanna create note in a folder
        folder_id = folderId; //set the folder_id to be updated in Db as this folder's if
        folder = await Folder.findOne({ created_by: userId, _id: folderId }); //find the folder which is to be updated later
        if (folder.topic_id) {
          //if folder is in any topic
          topic_id = folder.topic_id; //set the topic_id to be updated in Db as this folder's topic_id
          topic = await Topic.findOne({
            created_by: userId,
            _id: folder.topic_id,
          }); //find the topic whcih is to be updated later
        }
      } else if (topicId) {
        //Wanna create note in a topic outside of any folder
        topic_id = topicId;
        topic = await Topic.findOne({ created_by: userId, _id: topicId }); //find the topic whcih is to be updated later
      }
    }
    //create a new note
    const newNote = new Note({
      title,
      content,
      contentText,
      folder_id,
      created_by: userId,
      topic_id,
    });
    await newNote.save();

    user.notes.push(newNote._id); //update user's notes array
    if (newNote.folder_id) {
      //If new note has a folder_id then update that folder's notes array
      folder.notes.push(newNote._id);
      await folder.save();
    }
    if (newNote.topic_id) {
      //If new note has a topic_id then update that topic's notes array
      topic.notes.push(newNote._id);
      await topic.save();
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//2.    Function to View Content of a Note
exports.viewNote = async (req, res) => {
  try {
    const { noteId, userId } = req.body;
    const note = await Note.findById(noteId);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    } else {
      //title, content, color
      res
        .status(200)
        .json({ title: note.title, content: note.content, color: note.color });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//3.    Function to Update a Note
exports.updateNote = async (req, res) => {
  try {
    const { noteId, content, newtitle, newcolor, userId } = req.body;
    const note = await Note.findById(noteId);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    } else {
      if (content) {
        note.content = content;
      } //conent
      if (newtitle) {
        note.title = newtitle;
      } //title
      if (newcolor) {
        note.color = newcolor;
      } //color
      note.updated_at = Date.now();
      await note.save();
      const user = await User.findById(note.created_by);
      //user.notes.sort((a, b) => b.updated_at - a.updated_at); //ke kam dusre function mein lipat gaya
      await user.save();
      res
        .status(200)
        .json({ message: "Note Updated Successfully", content: note.content });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//4.    Function to Delete a Note
exports.deleteNote = async (req, res) => {
  try {
    const { noteIds, userId } = req.body;

    // Find the folders
    const notes = await Note.find({ _id: { $in: noteIds } }); //array of folders

    for (const note of notes) {
      //loop over the array of folders
      if (!note) {
        console.log("Note not found");
        continue; //continue if invalid folderId
      }

      // Mark the folder as deleted
      note.deleted = true;
      note.deletedAt = new Date(); //update time of deletion
      await note.save();
    }
    return res.status(200).json({
      message: "Note deleted and added to trashbin",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//5.    Function to Archive a Note
exports.archiveNote = async (req, res) => {
  try {
    const { noteIds, userId } = req.body;

    // Find the folders
    const notes = await Note.find({ _id: { $in: noteIds } }); //array of folders

    for (const note of notes) {
      //loop over the array of folders
      if (!note) {
        console.log("Note not found");
        continue; //continue if invalid folderId
      }

      // Mark the folder as deleted
      note.archived = true;
      await note.save();
    }
    return res.status(200).json({
      message: "Note archived",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//6.    Function to Recover a Note
exports.recoverNote = async (req, res) => {
  try {
    const { noteIds, userId } = req.body;

    // Find the folders
    const notes = await Note.find({ _id: { $in: noteIds } }); //array of folders

    for (const note of notes) {
      //loop over the array of folders
      if (!note) {
        console.log("Note not found");
        continue; //continue if invalid folderId
      }

      // Mark the folder as deleted
      note.deleted = false;
      note.deletedAt = null;
      note.updated_at = Date.now();
      await note.save();
    }
    return res.status(200).json({
      message: "Note recovered",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//7.    Function to Unarchive a Note
exports.unarchiveNote = async (req, res) => {
  try {
    const { noteIds, userId } = req.body;

    // Find the folders
    const notes = await Note.find({ _id: { $in: noteIds } }); //array of folders

    for (const note of notes) {
      //loop over the array of folders
      if (!note) {
        console.log("Note not found");
        continue; //continue if invalid folderId
      }

      // Mark the folder as deleted
      note.archived = false;
      note.updated_at = Date.now();
      await note.save();
    }
    return res.status(200).json({
      message: "Note unarchived successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//8.     Function to delete Note Permanently
exports.deleteNotePermanently = async (req, res) => {
  try {
    const { noteId, userId } = req.body;
    const note = await Note.findById(noteId);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    } else {
      await deleteNoteDependencies(note); //call a function to delete all the traces of the note from the folder, topic, user
      await Note.findByIdAndDelete(noteId);
      res.status(200).json({ message: "Note Deleted Permanently" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//9.    Function to Add Note to a Folder
exports.moveToFolder = async (req, res) => {
  try {
    const { noteId, folderId, userId } = req.body;
    const note = await Note.findById(noteId); //First find the note
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    } else {
      const folder = await Folder.findById(folderId); //Find the folder to which note is to be added
      if (!folder) {
        res.status(404).json({ message: "Folder not found" });
      } else {
        // Match notes with the same title existing in folder to which note is to be added
        const existingNotes = await Note.find(
          { _id: { $in: folder.notes }, title: note.title },
          { title: 1 }
        );
        if (existingNotes.length > 0) {
          return res.status(400).json({
            message: "Note with the same name already exists in the folder",
          });
        }

        const alraedyin = await Folder.findById(note.folder_id); //find the folder in the note already exist
        const alreadyintopic = await Topic.findById(note.topic_id); //find the topic in the note already exist
        if (alraedyin) {
          //If any such folder, then remove it from that folder
          alraedyin.notes.pull(note._id);
          await alraedyin.save();
        }
        if (alreadyintopic) {
          //If such topic then remove it from that topic
          alreadyintopic.notes.pull(note._id);
          await alreadyintopic.save();
        }
        folder.notes.push(noteId); //add the note to the new folder to which it was intented to be moved
        const topic = await Topic.findById(folder.topic_id); //find the topic to the which the new folder belongs //If such topic we have to update it too
        if (topic) {
          //if such topic// ignore if null i.e folder never belongs to any topic
          topic.notes.push(noteId); //upddate that topic
          await topic.save();
        }
        await folder.save();
        note.folder_id = folder._id; //set new folderId
        note.topic_id = folder.topic_id; //set new topicId
        note.updated_at = Date.now(); //update the updatation time
        await note.save();
        res.status(200).json({ message: "Note Added to Folder" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//10.   Function to Add Note to a Topic
exports.moveToTopic = async (req, res) => {
  try {
    const { noteId, topicId, userId } = req.body;
    const note = await Note.findById(noteId); //find the note
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    } else {
      const topic = await Topic.findById(topicId); //find the topic
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      } else {
        const existingNotes = await Note.find(
          {
            //find the existing with same title in the topic
            _id: { $in: topic.notes },
            folder_id: null, // Match notes without a folder
            title: note.title, // Match notes with the same title
          },
          { title: 1 }
        );

        if (existingNotes.length > 0) {
          return res.status(400).json({
            message: "Note with the same name already exists in the topic",
          });
        }

        const infolder = await Folder.findById(note.folder_id); //find the folder in which the note exist
        if (infolder) {
          //If the note reallt existed in some folder- remove it from there
          note.folder_id = null;
          infolder.notes.pull(noteId);
          await infolder.save();
        }
        topic.notes.push(noteId); //update topic
        note.topic_id = topic._id;
        note.updated_at = Date.now(); //update the updation time
        await note.save();
        await topic.save();
        res.status(200).json({ message: "Note Added to Topic" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
