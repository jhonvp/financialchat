const chatController = {};

chatController.join = (req, res, next) => {
  return res.render("chat", {
    username: req.body.username,
    room: req.body.room,
  });
};

module.exports = chatController;
