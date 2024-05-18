//THIS FILE CONTAINS THE ROUTERS

const express = require("express");
const router = express.Router();
const auth = require("./User/auth-Controller");
const note = require("./Note/note-Controller");
const folder = require("./Folder/folder-Controller");
const middleware = require("./middleware");

const signupSchema = require("./User/signup-Schema");
const validate = require("./User/validate-signup");

const {
  viewFoldersArchive,
  viewNotesArchive,
  viewAllDocs,
  viewFoldersTrash,
  viewNotesTrash,
  viewAllDocsinTopic,
  addTopic,
  viewTopics,
  searchNote,
} = require("./User/document-Controller");

//To handle User
router.route("/signup").post(validate(signupSchema), auth.signup); //route to signup page //Validation to be added
router.route("/login").post(auth.login); //route to handle login page

//To handle Folder
router.route("/makefolder").post(folder.createFolder); //route to create folder
router.route("/deletefolder").patch(folder.deleteFolder); //route to delete folder
router.route("/viewfolder").get(middleware.authenticate, folder.viewFolder); //route to view folder
router.route("/archivefolder").post(folder.archiveFolder); //route to archive folder

router.route("/recoverfolder").post(folder.recoverFolder); //route to recover folder from trashbin
router.route("/unarchivefolder").post(folder.unarchiveFolder); //route to unarchive folder from trashbin
router.route("/deletefolderpermanently").post(folder.deleteFolderPermanently); //toute to delete user permanently from trashbin
router.route("/renamefolder").post(folder.renameFolder);

router.route("/addtotopic").post(folder.moveToTopic); //route to add a single folder to topics
router.route("/updatefolder").post(folder.updateFolderColor); //route to change color of a folder

//To Handle Notes
router.route("/makenote").post(note.saveNote); //route to handle note creation

router.route("/deletenote").patch(note.deleteNote); //route to handle note deletion
router.route("/recovernote").post(note.recoverNote);
router.route("/deletenotepermanently").post(note.deleteNotePermanently);

router.route("/viewnote").get(middleware.authenticate, note.viewNote); //route to view folder
router.route("/updatenote").post(note.updateNote); //route to update note

router.route("/archivenote").post(note.archiveNote);
router.route("/unarchivenote").post(note.unarchiveNote);

router.route("/movetofolder").post(note.moveToFolder);
router.route("/movetotopic").post(note.moveToTopic);

//To Handle All Documents
router.route("/addtopic").post(middleware.authenticate, addTopic);
router.route("/viewtopics/:userId").get(viewTopics);
router.route("/viewfoldersarchive/:userId").get(viewFoldersArchive);
router.route("/viewnotesarchive/:userId").get(viewNotesArchive);
router.route("/viewfolderstrash/:userId").get(viewFoldersTrash);
router.route("/viewnotestrash/:userId").get(viewNotesTrash);
router.route("/viewdocsintopic").post(viewAllDocsinTopic);
router.route("/alldocs/:userId").get(viewAllDocs);
router.route("/searchnote").post(middleware.authenticate, searchNote);

//To view user's documents

module.exports = router;
