const indexController = {};

indexController.getIndex = (req, res, next) => { 
    return  res.render('index');
};

module.exports = indexController;