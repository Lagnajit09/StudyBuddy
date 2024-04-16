//THIS FILE CONTAINS THE FUNCTION STO CREATE AND DELETE A FOLDER AND VIEW CONTENTS OF FOLDER

const Folder = require("./folderModel");
const User = require(".././User/userModel");
const Note = require(".././Note/noteModel");
const Topic = require(".././Topic/topicModel");
const {
  deleteFolderDependencies,
  deleteNotesInFolder,
} = require("../User/document-Controller");
//1.  Create a new folder
exports.createFolder = async (req, res) => {
  try {
    const { name, userId, topicId } = req.body;

    const existingFolder = await Folder.findOne({ name, created_by: userId }); //Find if folder already exists anywhere(by user)
    const user = await User.findById(userId);
    let topic_id = null; //to be updated in db
    let topic;
    if (topicId) {
      //Wanna create a folder indide a topic
      topic = await Topic.findOne({ created_by: userId, _id: topicId }); //Find Topic if it exists
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      topic_id = topicId; //This topicID is to be updated in the new Folder to be created// if no topic Id is given then it would have been null i.e user is trying to create a FOLDER outside of any topic
      const existingFolderInTopic = await Folder.findOne({
        name,
        created_by: userId,
        topic_id,
      });

      if (existingFolderInTopic) {
        //If folder with same name exists in the topic
        if (!existingFolderInTopic.deleted && !existingFolderInTopic.archived) {
          //If physically exists
          return res.status(400).json({
            message: "Folder with the same name already exists in this topic",
          });
        }
        if (existingFolderInTopic.deleted || existingFolderInTopic.archived) {
          //If virtually exists in trash or archives
          return res.status(400).json({
            message:
              "Folder with the same name already exists in your thrashbin or archives",
          });
        }
      }
    } else if (existingFolder && existingFolder.topic_id == null) {
      //If folder exists but not in any topic
      if (!existingFolder.deleted && !existingFolder.archived) {
        //If exists physically
        return res
          .status(400)
          .json({ message: "Folder with the same name already exists" });
      } //if exists in trash or archives
      else {
        return res.status(400).json({
          message:
            "Folder with the same name already exists in your thrashbin or archives",
        });
      }
    }
    // Create a new folder instance
    const newFolder = new Folder({
      name,
      created_by: userId,
      topic_id,
    });

    // Save the folder to the database
    await newFolder.save();
    user.folders.push(newFolder._id); //update user's folders list
    await user.save();

    if (topic_id) {
      //IF topic_id is not null then update that topic's folders attribute
      if (topic) {
        topic.folders.push(newFolder._id); //update topic's folders list
        await topic.save();
      } else {
        return res.status(404).json({ message: "Topic not found" });
      }
    }

    res
      .status(201)
      .json({ message: "Folder created successfully", folder: newFolder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//2.   Delete a folder and Move to Trash
exports.deleteFolder = async (req, res) => {
  try {
    const { folderIds, userId } = req.body;

    // Find the folders
    const folders = await Folder.find({ _id: { $in: folderIds } }); //array of folders

    for (const folder of folders) {
      //loop over the array of folders
      if (!folder) {
        console.log("Folder not found");
        continue; //continue if invalid folderId
      }

      // Mark the folder as deleted
      folder.deleted = true;
      folder.deletedAt = new Date(); //update time of deletion
      await folder.save();

      // Mark the notes inside the folder as deleted
      for (const noteId of folder.notes) {
        const note = await Note.findById(noteId);
        if (note) {
          note.deleted = true;
          note.deletedAt = new Date(); //update time of deletion
          await note.save();
        }
      }
    }
    res.status(200).json({
      message: "Folder deleted and added to thrashbin",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//3.  Archive a folder
exports.archiveFolder = async (req, res) => {
  try {
    const { folderIds, userId } = req.body;

    // Find the folders
    const folders = await Folder.find({ _id: { $in: folderIds } }); //array of folders
    for (const folder of folders) {
      if (!folder) {
        console.log("Folder not found");
        continue; //continue if invalid folderId
      }

      // Mark the folder as archived
      folder.archived = true;
      await folder.save();

      // Mark the notes inside the folder as archived
      for (const noteId of folder.notes) {
        const note = await Note.findById(noteId);
        if (note) {
          note.archived = true;
          await note.save();
        }
      }
    }
    res.status(200).json({
      message: "Folder archived successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//4.  Function to Unarchive folders
exports.unarchiveFolder = async (req, res) => {
  try {
    const { folderIds, userId } = req.body;

    // Find the folders
    const folders = await Folder.find({ _id: { $in: folderIds } }); //array of folders
    for (const folder of folders) {
      //loop over the array of folders
      if (!folder) {
        console.log("Folder not found");
        continue;
      }

      // Mark the folder as unarchived
      folder.archived = false;
      await folder.save();

      // Mark the notes inside the folder as unarchived
      for (const noteId of folder.notes) {
        const note = await Note.findById(noteId);
        if (note) {
          note.archived = false;
          await note.save();
        }
      }
    }
    res.status(200).json({
      message: "Folder unarchived successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//5.  View Notes inside a folder
exports.viewFolder = async (req, res) => {
  try {
    const { folderId, userId } = req.body;
    const folder = await Folder.findById(folderId); //find the folder
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    //get notes which are not archived and not deleted
    const filteredNotes = await Note.find({
      folder_id: folderId,
      deleted: false,
      archived: false,
    });
    res.status(200).json(filteredNotes); //return their ids
    // res.status(200).json(filteredNotes.map((note) => note._id)); //return their ids
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//6.  Add/Remove single folder to topic
exports.moveToTopic = async (req, res) => {
  try {
    const { folderId, topicId, userId } = req.body;
    const folder = await Folder.findById(folderId); //Find the folder
    if (!folder) {
      res.status(404).json({ message: "Folder not found" });
    } else {
      //If folder exist
      const topic = await Topic.findById(topicId); //Find topic
      if (!topic) {
        res.status(404).json({ message: "Topic not found" });
      } else {
        //If topic found
        const existingFolders = await Folder.find(
          { _id: { $in: topic.folders }, name: folder.name },
          { name: 1 }
        ); // Match folders with the same name
        if (existingFolders.length > 0) {
          //If match exists
          return res.status(400).json({
            message: "Note with the same name already exists in the topic",
          });
        }

        topic.folders.push(folderId); //push folderid to the topic's folders array
        const notes = await Note.find({ _id: { $in: folder.notes } }); //Find notes in the folder
        for (const note of notes) {
          //For all the notes in the folder
          note.topic_id = topic._id; //Update topic_id of each note
          topic.notes.push(note._id); //push noteid to the topic's notes array
          note.updated_at = Date.now(); //Update data of updation
          await note.save();
          await topic.save();
        }
        return res.status(200).json({ message: "Note Added to Topic" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//7.  Function to delete premanently from trashbin
exports.deleteFolderPermanently = async (req, res) => {
  try {
    const { folderIds, userId } = req.body;

    const folders = await Folder.find({ _id: { $in: folderIds } }); //array of folders to be deleted
    for (const folder of folders) {
      //loop over the array of folders
      if (!folder) {
        console.log("Folder not found");
        continue;
      }
      await deleteFolderDependencies(folder); //remove dependencies of the folders
      await deleteNotesInFolder(folder);
      await Folder.deleteOne({ _id: folder._id }); //delete the folder from DB
    }
    res.status(200).json({
      message: "Folder deleted Permanently",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//8.  Function to recover folders from trash bin
exports.recoverFolder = async (req, res) => {
  try {
    const { folderIds, userId } = req.body;

    const folders = await Folder.find({ _id: { $in: folderIds } }); //array of folders to be recovered
    for (const folder of folders) {
      //loop over the array of folders
      if (!folder) {
        console.log("Folder not found");
        continue;
      }

      // Mark the folder as undeleted
      folder.deleted = false;
      folder.deletedAt = null;
      await folder.save();

      // Mark the notes inside the folder as undeleted
      for (const noteId of folder.notes) {
        const note = await Note.findById(noteId);
        if (note) {
          note.deleted = false;
          note.deletedAt = null;
          await note.save();
        }
      }
    }
    res.status(200).json({
      message: "Folder recovered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//9. To Rename a Folder
exports.renameFolder = async (req, res) => {
  try {
    const { folderId, newname, userId } = req.body;

    const folder = await Folder.findById(folderId);
    folder.name = newname;
    await folder.save();

    res.status(200).json({
      message: "Folder renamed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//10. To update color of folder
exports.updateFolderColor = async (req, res) => {
  try {
    const { folderId, color, userId } = req.body;

    const folder = await Folder.findById(folderId);
    folder.color = color;
    await folder.save();

    res.status(200).json({
      message: "Folder color changed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
