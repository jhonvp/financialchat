const mongoose = require("mongoose");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "mongodb.json"))[
  env
];
const database = mongoose.connection.useDb(config.MONGODB_DATABASE);
let Message = new mongoose.Schema({
  userid: { type: String },
  username: { type: String },
  room: { type: String },
  text: { type: String },
  visible: { type: Boolean },
  time: { type: Date, default: Date.now },
});
module.exports = database.model("Messages", Message, "Messages");
