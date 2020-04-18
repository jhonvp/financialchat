const chatController = {};

chatController.join = (req, res, next) => {
  return res.render("chat", {
    username: req.query.username,
    room: req.query.room,
  });
};

module.exports = chatController;
