const mongoose = require("mongoose");
// Creates a note schema that optionally references a user
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
