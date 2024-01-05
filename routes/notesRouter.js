const express = require("express");
const {
  sendNote,
  getNote,
  updateNote,
  deleteNote,
  getNoteByUser,
  shareNote,
} = require("../controller/noteController");
const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If authenticated, call the next function in the middleware chain
    return next();
  }

  // If not authenticated, send a 401 Unauthorized response
  res.status(401).json({
    status: "fail",
    message: "Unauthorized access",
  });
};

router
  .route("/")
  .post(ensureAuthenticated, sendNote)
  .get(ensureAuthenticated, getNote);
router
  .route("/:id")
  .get(ensureAuthenticated, getNoteByUser)
  .patch(ensureAuthenticated, updateNote)
  .delete(ensureAuthenticated, deleteNote);

router.route("/:id/share").post(ensureAuthenticated, shareNote);

module.exports = router;
