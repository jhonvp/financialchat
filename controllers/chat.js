const chatController = {};

chatController.join = (req, res, next) => {
  if (req.query.username && req.query.room) {
    let username = req.query.username.replace(/[^\w\s]/gi, '');
    let room = req.query.room.replace(/[^\w\s]/gi, '');
    if (username.length > 3 && room.length > 3) {
      return res.render("chat", {
        username,
        room,
      });
    } else {
      res.redirect(304, "/");
    }
  } else {
    res.redirect(304, "/");
  }
};

module.exports = chatController;
