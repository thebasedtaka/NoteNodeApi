const express = require("express");
const { noteSearch } = require("../controller/searchController");

const router = express.Router();

router.get("/", noteSearch);

module.exports = router;
