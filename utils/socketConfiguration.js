const socketio = require("socket.io");
const path = require("path");
const userController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "users"
));

const messageController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "messages"
));

module.exports = async (app) => {
  const io = socketio(app);
  const botName = "Financial Chat Bot";

  // Run when client connects
  io.on("connection", (socket) => {
    function processMessage(
      isWelcomeMessage,
      isBotMessage,
      username,
      room,
      status,
      text,
      isVisible,
      isUserData,
      cb
    ) {
      let message = {
        isWelcomeMessage,
        isBotMessage,
        messageData: {},
        userData: {},
      };
      message.messageData.username = username;
      if (isBotMessage) {
        message.messageData.username = botName;
      }
      message.messageData.text = text;
      message.messageData.room = room;
      message.messageData.userid = socket.id;
      message.messageData.visible = isVisible;
      message.messageData.time = Date.now();
      if (isUserData) {
        message.userData = {
          id: socket.id,
          username,
          room,
          status,
        };
      }

      messageController.saveMessage(message.messageData, (error) => {
        if (error) {
          cb(error);
        }
        return cb(null, message);
      });
    }

    socket.on("joinRoom", async ({ username, room }) => {
      userController.userJoin(socket.id, username, room, (error, user) => {
        if (error) {
          // Welcome current user
          processMessage(
            true,
            true,
            username,
            room,
            error,
            `Welcome to ${room} --- ${username}(${socket.id}) `,
            true,
            false,
            (error, message) => {
              if (error) {
                log.error(`There was an error socket.joinRoom.welcome`);
                log.error(error);
              }
              socket.emit("message", message);
            }
          );
        } else {
          socket.join(user.room);

          messageController.lastMessages(user.room, 50, (error, messages) => {
            io.to(user.room).emit("roomMessages", {
              info: messages,
            });

            processMessage(
              true,
              true,
              username,
              room,
              "Active",
              `Welcome to ${room} --- ${username}(${socket.id}) `,
              false,
              true,
              (error, message) => {
                if (error) {
                  log.error(`There was an error socket.joinRoom.welcome`);
                  log.error(error);
                }
                // Welcome current user
                socket.emit("message", message);

                processMessage(
                  false,
                  true,
                  username,
                  room,
                  "Active",
                  `${user.username} has joined the chat`,
                  false,
                  false,
                  (error, message) => {
                    if (error) {
                      log.error(`There was an error socket.joinRoom.join`);
                      log.error(error);
                    }
                    // Broadcast when a user connects
                    socket.broadcast.to(user.room).emit("message", message);
                    // Send users and room info
                    userController.getRoomUsers(user.room, function (
                      error,
                      users
                    ) {
                      if (error) {
                        log.error(
                          `There was an error socket.disconnect.getRoomUsers`
                        );
                        log.error(error);
                      }
                      io.to(user.room).emit("roomUsers", {
                        users,
                      });
                    });
                  }
                );
              }
            );
          });
        }
      });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
      userController.getCurrentUser(socket.id, (error, user) => {
        processMessage(
          false,
          false,
          user.username,
          user.room,
          error,
          msg,
          true,
          false,
          (error, message) => {
            if (error) {
              log.error(`There was an error socket.chatMessage`);
              log.error(error);
            }
            io.to(user.room).emit("message", message);
          }
        );
      });
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      userController.userLeave(socket.id, (error, user) => {
        if (user) {
          processMessage(
            false,
            true,
            username,
            room,
            error,
            `${user.username} has left the chat`,
            false,
            (error, message) => {
              if (error) {
                log.error(`There was an error socket.disconnect`);
                log.error(error);
              }
              io.to(user.room).emit("message", message);
            }
          );

          // Send users and room info
          userController.getRoomUsers(user.room, function (error, users) {
            if (error) {
              log.error(`There was an error socket.disconnect.getRoomUsers`);
              log.error(error);
            }
            io.to(user.room).emit("roomUsers", {
              users,
            });
          });
        }
      });
    });
  });
};
