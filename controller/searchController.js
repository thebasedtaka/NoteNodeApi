const Note = require("../model/noteModel");

/**
 * Searches for notes based on the given query.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.noteSearch = async (req, res, next) => {
  try {
    // Search for notes matching the query in the title or content fields
    const notes = await Note.find({
      $or: [
        { title: new RegExp(req.query.q, "i") },
        { content: new RegExp(req.query.q, "i") },
      ],
    });

    // Send the response with the fetched notes
    res.status(200).json({
      status: "success",
      message: "Notes fetched",
      data: { notes },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Server Error" });
  }
};
