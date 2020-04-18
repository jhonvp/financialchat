const socketio = require("socket.io");
const path = require("path");
const controllerUser = require(path.join(
  __dirname,
  "..",
  "controllers",
  "users"
));

module.exports = async (app) => {
  const io = socketio(app);
  const botName = "Financial Chat Bot";

  // Run when client connects
  io.on("connection", (socket) => {
    function formatMessage(
      isWelcomeMessage,
      isBotMessage,
      username,
      room,
      status,
      text,
      isUserData
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
      message.messageData.time = Date.now();
      if (isUserData) {
        message.userData = {
          id: socket.id,
          username,
          room,
          status,
        };
      }
      return message;
    }

    socket.on("joinRoom", async ({ username, room }) => {
      controllerUser.userJoin(socket.id, username, room, (error, user) => {
        if (error) {
          // Welcome current user
          socket.emit(
            "message",
            formatMessage(
              true,
              true,
              username,
              room,
              error,
              `Welcome to ${room} --- ${username}(${socket.id}) `,
              true
            )
          );
        } else {
          socket.join(user.room);

          // Welcome current user
          socket.emit(
            "message",
            formatMessage(
              true,
              true,
              username,
              room,
              "Active",
              `Welcome to ${room} --- ${username}(${socket.id}) `,
              true
            )
          );
          // Broadcast when a user connects
          socket.broadcast
            .to(user.room)
            .emit(
              "message",
              formatMessage(
                false,
                true,
                username,
                room,
                "Active",
                `${user.username} has joined the chat`,
                false
              )
            );
          controllerUser.getRoomUsers(user.room, function (error, users) {
            io.to(user.room).emit("roomUsers", {
              users,
            });
          });
        }
      });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
      controllerUser.getCurrentUser(socket.id, (error, user) => {
        io.to(user.room).emit(
          "message",
          formatMessage(
            false,
            false,
            user.username,
            user.room,
            error,
            msg,
            false
          )
        );
      });
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      controllerUser.userLeave(socket.id, (error, user) => {
        if (user) {
          io.to(user.room).emit(
            "message",
            formatMessage(
              false,
              true,
              username,
              room,
              error,
              `${user.username} has left the chat`,
              false
            )
          );

          // Send users and room info
          controllerUser.getRoomUsers(user.room, function (error, users) {
            io.to(user.room).emit("roomUsers", {
              users,
            });
          });
        }
      });
    });
  });
};
