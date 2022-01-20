const {model, SchemaTypes, Schema} = require("mongoose");

const NoteSchema = Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: "user"
  },
  title: {
    type: SchemaTypes.String,
    required: true,
    trim: true,
    default: "Untitled note"
  },
  content: {
    type: SchemaTypes.String,
    required: true,
    default: ""
  }
}, {timestamps: true});

const NoteModel = model("note", NoteSchema, "note");

module.exports = NoteModel;
