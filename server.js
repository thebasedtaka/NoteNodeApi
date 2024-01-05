const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("exception.. shutting down..");

  process.exit(1);
});

const DB = async () => {
  const mongo = process.env.MONGODB_URI;
  try {
    mongoose.connect(mongo);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

const port = process.env.PORT || 3000;
const server = app.listen(port, async () => {
  DB();
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("rejection.. shutting down..");
  server.close(() => {
    process.exit(1);
  });
});
