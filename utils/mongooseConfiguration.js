const mongoose = require("mongoose");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "mongodb.json"))[
  env
];
const MONGODB_URL = config.MONGODB_URL;
const log = require("./logConfiguration");
const mongodbConnector = () => {
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    ssl: false,
    sslValidate: false,
    socketTimeoutMS: 36000,
    keepAlive: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    log.debug(`The database was connected successfully.`);
  });
  mongoose.connection.on("error", (error) => {
    log.error(`There is an error on the database connection.`);
    log.error(error);
  });
  mongoose.connection.on("disconnected", () => {
    log.debug(`The database was disconnected.`);
  });
  process.on("SIGINT", () => {
    mongoose.connection.close(function () {
      log.debug(`The application was closed.`);
      process.exit(0);
    });
  });
};
module.exports = mongodbConnector;
