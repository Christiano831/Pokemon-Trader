const Request = require('../models/request');


module.exports = {
    //create,
    index
}

function index(req, res) {
    console.log(req.user, '< - req.usre');
    Request.find({}, function(err, requests) {
        res.render('requests/index', {
            requests
        });
    });
}