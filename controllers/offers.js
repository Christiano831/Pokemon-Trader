const Offer = require('../models/offer');


module.exports = {
    index,
    create,
    new: newOffer,
    show
}

function index(req, res) {
    console.log(req.user, '< - req.usre');
    Offer.find({}, function(err, offers) {
        res.render('offers/index', {
            offers
        });
    });
}

function create(req, res) {
    const offer = Offer(req.body);
    offer.save(function(err) {
        if (err) return res.render('offers/new');
        res.redirect('/offers/new');
    })
}

function newOffer(req, res) {
    res.render('offers/new', {title: "Add Offer"})
}

function show(req, res) {
    Offer.findById(req.params.id, function(err, tickets) {
        res.render('offers/show', {title: 'Offer Details'})
    })
}