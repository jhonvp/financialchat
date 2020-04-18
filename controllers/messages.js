const path = require("path");
const Messages = require(path.join(__dirname, "..", "models", "messages"));
const log = require(path.join(__dirname, "..", "utils", "logConfiguration"));
const messageController = {};

messageController.saveMessage = function (information, cb)  {
  const message = new Messages({
    userid: information.userid,
    username:  information.username,
    room: information.room,
    text: information.text,
    visible: information.visible
  });
  message.save((error, message) => {
    if (error) {
      log.error(`There is an error processing ${message}`);
      log.error(error);
      return cb(`There is an error processing ${message}`, null);
    }
    return cb(null, message);
  });
};



messageController.lastMessages = function (room,limit, cb)  {
    const findMessages = Messages.find({ room: room, visible: true }).sort('-time').limit(limit);
    const promise = findMessages.exec();
    promise.then((messages)=>{
      if(!messages){
        return cb(null, []);
      }else{
        return cb(null, messages);
      }
  
    }).catch((error)=>{
      log.error(`There is an error getting messages in room ${room}`);
      log.error(error);
      return cb(`There is an error getting messages in room ${room}`, null);
    });
  };


module.exports = messageController;
