const Note = require("../model/noteModel");
const User = require("../model/userModel");

/**
 * Send a note.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the note is sent.
 */
exports.sendNote = async (req, res) => {
  try {
    const user = req.user.id; // Get the user id from the request object
    const { title, content } = req.body; // Get the title and content from the request body
    const note = await Note.create({ title, content, user }); // Create a new note with the provided title, content, and user id
    res.status(200).json({
      // Send a success response with the created note
      status: "success",
      message: "Note created",
      data: {
        note,
      },
    });
  } catch (error) {
    console.log(error); // Log any errors that occur
  }
};

exports.getNoteByUser = async (req, res, next) => {
  try {
    console.log(req.params.id); // Log the user ID
    const notes = await Note.find({ user: req.params.id }); // Find notes for the user
    if (!notes) {
      return res
        .status(404)
        .json({ status: "fail", message: "Notes not found" }); // Return error if notes are not found
    }
    res
      .status(200)
      .json({ status: "success", message: "Notes fetched", data: { notes } }); // Return notes if found
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).json({ status: "fail", message: "Server Error" }); // Return server error
  }
};

exports.getNote = async (req, res, next) => {
  try {
    // Find notes for the specified user or the authenticated user
    const notes = await Note.find({
      $or: [{ user: req.params.id }, { user: req.user.id }],
    });

    // If no notes are found, return a 404 error
    if (!notes) {
      return res
        .status(404)
        .json({ status: "fail", message: "Notes not found" });
    }

    // Return the fetched notes
    res
      .status(200)
      .json({ status: "success", message: "Notes fetched", data: { notes } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

/**
 * Update a note by its ID
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
exports.updateNote = async (req, res, next) => {
  try {
    // Find and update the note by its ID
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Send a success response with the updated note
    res.status(200).json({
      status: "success",
      message: "Note updated",
      data: { note },
    });
  } catch (error) {
    // Log the error
    console.log(error);

    // Send a server error response
    res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    // Find and delete the note by ID
    await Note.findByIdAndDelete(req.params.id);

    // Send a success response
    res.status(204).json({ status: "success", message: "Note deleted" });
  } catch (error) {
    // Log the error
    console.log(error);

    // Send an error response
    res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

exports.shareNote = async (req, res) => {
  try {
    const user = req.user.id;
    const validUser = await User.findById(user);

    // Check if user exists
    if (!validUser) {
      return res.status(401).json({
        status: "fail",
        message: "User Does not exist",
      });
    }

    const { title, content } = req.body;

    // Create a new note
    const note = await Note.create({ title, content, user });

    res.status(200).json({
      status: "success",
      message: "Note created",
      data: {
        note,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
