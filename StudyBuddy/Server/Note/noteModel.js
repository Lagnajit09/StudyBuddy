//THIS FILE CONTAINS THE NOTE SCHEMA

const mongoose = require("mongoose");
const User = require(".././User/userModel");
const Folder = require(".././Folder/folderModel");

const Schema = mongoose.Schema;
const noteSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: [true, "A note must have a title"],
  },
  content: {
    type: "String",
    required: true,
  },
  contentText: {
    type: "String",
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  folder_id: {
    type: Schema.Types.ObjectId,
    ref: "Folder",
  },
  shared_with: {
    type: Array, //[name of collection whose object ]
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
  },
  color: {
    type: String,
    default: "#D9D9D9",
  },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
