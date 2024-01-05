// packages
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const session = require("express-session");
const compression = require("compression");
const passport = require("passport");
const app = express();
//routes
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/notesRouter");
const searchRouter = require("./routes/searchRouter");

require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//extra logging
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(
  session({ secret: process.env.SECRET, resave: true, saveUninitialized: true })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // Limit each IP to 10 requests per `window`
  standardHeaders: true,
  message: "Too many requests, please try again later.",
});

// Parse JSON bodies and urls
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(limiter);

// Data sanitization against attacks
app.use(mongoSanitize());
// Data compression
app.use(compression());
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use("/api/auth", userRouter);
app.use("/api/notes", noteRouter);
app.use("/api/search", searchRouter);
// Catch all
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
