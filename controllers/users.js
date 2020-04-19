const path = require("path");
const Users = require(path.join(__dirname, "..", "models", "users"));
const log = require(path.join(__dirname, "..", "utils", "logConfiguration"));
const userController = {};

userController.userJoin = function (id, username, room, cb) {
  const user = new Users({
    _id: id,
    username,
    room,
  });
  user.save((error, user) => {
    if (error) {
      log.error(`There is an error with the socket ${id}`);
      log.error(error);
      return cb(`There is an error with the socket ${id}`, null);
    }
    return cb(null, user);
  });
};

userController.getCurrentUser = async (id, cb) => {
  const getUser = Users.findOne({ _id: id });
  const promise = getUser.exec();
  promise
    .then((user) => {
      cb(null, user);
    })
    .catch((error) => {
      log.error(`There is an error getting the socket ${id}`);
      log.error(error);
      return cb(`There is an error getting the socket ${id}`, null);
    });
};

userController.userLeave = async (id, cb) => {
  const deleteUser = Users.findOneAndDelete({ _id: id });
  const promise = deleteUser.exec();
  promise
    .then((user) => {
      cb(null, user);
    })
    .catch((error) => {
      log.error(`There is an error with the socket ${id}`);
      log.error(error);
      return cb(`There is an error with the socket ${id}`, null);
    });
};

userController.getRoomUsers = function (room, cb) {
  const findUsers = Users.find({ room: room });
  const promise = findUsers.exec();
  promise
    .then((users) => {
      if (!users) {
        return cb(null, []);
      } else {
        return cb(null, users);
      }
    })
    .catch((error) => {
      log.error(`There is an error getting users in room ${room}`);
      log.error(error);
      return cb(`There is an error getting users in room ${room}`, null);
    });
};

userController.usersLeave = async (cb) => {
  const deleteUsers = Users.deleteMany({});
  const promise = deleteUsers.exec();
  promise
    .then(() => {
      return cb(null);
    })
    .catch((error) => {
      log.error(`There is an error cleaning the users`);
      log.error(error);
      return cb(`There is an error cleaning the users`, null);
    });
};

module.exports = userController;
