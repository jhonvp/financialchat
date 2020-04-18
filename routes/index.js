const express = require("express");
const router = express.Router();
const path = require("path");
const indexController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "index"
));
const chatController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "chat"
));

/* GET home page. */
router.get("/", indexController.getIndex);

/* GET join the room. */
router.get("/join", chatController.join);

module.exports = router;
