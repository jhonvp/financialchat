const mongoose = require("mongoose");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "mongodb.json"))[
  env
];
const database = mongoose.connection.useDb(config.MONGODB_DATABASE);
let User = new mongoose.Schema({
  _id: { type: String },
  username: { type: String },
  room: { type: String },
  time: { type: Date, default: Date.now },
});
module.exports = database.model("Users", User, "Users");
