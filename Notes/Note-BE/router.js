//THIS FILE CONTAINS THE ROUTERS

const express=require('express')

const router=express.Router()
const auth=require("./User/auth-Controller")
const note = require("./Note/note-Controller")
const folder = require("./Folder/folder-Controller")
const middleware = require("./middleware")

const signupSchema= require("./User/signup-Schema")
const validate=require("./User/validate-signup")

const { viewArchive, viewAllDocs, viewTrash, viewAllDocsinTopic, addTopic, viewTopics} = require('./User/document-Controller')

//To handle User
router.route('/signup').post(validate(signupSchema),auth.signup)  //route to signup page //Validation to be added
router.route('/login').post(auth.login)  //route to handle login page


//To handle Folder
router.route('/makefolder').post(middleware.authenticate,folder.createFolder) //route to create folder
router.route('/deletefolder').patch(middleware.authenticate,folder.deleteFolder) //route to delete folder
router.route('/viewfolder').get(middleware.authenticate,folder.viewFolder) //route to view folder
router.route('/archivefolder').post(middleware.authenticate, folder.archiveFolder)  //route to archive folder

router.route("/recoverfolder").post(middleware.authenticate,folder.recoverFolder)   //route to recover folder from trashbin
router.route("/unarchivefolder").post(middleware.authenticate, folder.unarchiveFolder)  //route to unarchive folder from trashbin
router.route("/deletefolderpermanently").post(middleware.authenticate,folder.deleteFolderPermanently) //toute to delete user permanently from trashbin
router.route("/renamefolder").post(middleware.authenticate,folder.renameFolder)

router.route("/addtotopic").post(middleware.authenticate,folder.moveToTopic) //route to add a single folder to topics


//To Handle Notes
router.route('/makenote').post(middleware.authenticate, note.saveNote) //route to handle note creation

router.route('/deletenote').patch(middleware.authenticate,note.deleteNote) //route to handle note deletion
router.route('/recovernote').post(middleware.authenticate, note.recoverNote)
router.route('/deletenotepermanently').post(middleware.authenticate, note.deleteNotePermanently)

router.route('/viewnote').get(middleware.authenticate,note.viewNote) //route to view folder
router.route('/updatenote').post(middleware.authenticate, note.updateNote) //route to update note

router.route('/archivenote').post(middleware.authenticate, note.archiveNote)
router.route('/unarchivenote').post(middleware.authenticate, note.unarchiveNote)

router.route('/movetofolder').post(middleware.authenticate, note.moveToFolder)
router.route('/movetotopic').post(middleware.authenticate, note.moveToTopic)


//To Handle All Documents
router.route('/addtopic').post(middleware.authenticate, addTopic)
router.route('/viewtopics').post(middleware.authenticate, viewTopics)
router.route('/viewarchives').post(middleware.authenticate, viewArchive)
router.route('/viewtrash').post(middleware.authenticate, viewTrash)
router.route('/viewdocsintopic').post(middleware.authenticate, viewAllDocsinTopic)
router.route('/alldocs').post(middleware.authenticate, viewAllDocs)






//To view user's documents

module.exports = router


