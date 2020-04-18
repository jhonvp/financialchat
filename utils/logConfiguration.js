const path = require("path");
const fs = require("fs");
const logLibrary = require("log");
let log = new logLibrary(
  "debug",
  fs.createWriteStream(path.join(__dirname, "..", "logs", "logSystem.log"), {
    flags: "a",
  })
);
module.exports = log;
