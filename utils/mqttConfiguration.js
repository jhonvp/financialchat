const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:4883");
const path = require("path");
const log = require(path.join(__dirname, "..", "utils", "logConfiguration"));

module.exports = (io) => {
  client.on("connect", function () {
    client.subscribe("financialcommandresponse", function (err) {
      if (!err) {
        log.error(
          `The mqqt financialcommandresponse subscribe throw and error.`
        );
        log.error(err);
      }
    });
  });

  client.on("message", function (topic, message) {
    const messageInformation = message.toString().split(";");

    io.processMessage(
      false,
      true,
      io.botName,
      messageInformation[3],
      "",
      messageInformation[1],
      messageInformation[2],
      true,
      false,
      (error, message) => {
        if (error) {
          log.error(`There was an error socket.chatMessage`);
          log.error(error);
        }
        io.to(messageInformation[3]).emit("message", message);
      }
    );
  });

  return client;
};
