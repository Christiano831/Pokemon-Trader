const Offer = require('../models/offer');


module.exports = {
    //create,
    index
}

function index(req, res) {
    console.log(req.user, '< - req.usre');
    Offer.find({}, function(err, offers) {
        res.render('offers/index', {
            offers
        });
    });
}

// function create(req, res) {
//     const offer = Offer(req.body);
//     offer.save(function(err) {
//         if (err) return res.render('offers/new');
//         res.redirect('/offers/new');
//     })
// }