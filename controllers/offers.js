const Offer = require('../models/offer');


module.exports = {
    index,
    create,
    new: newOffer,
    show
}

function index(req, res) {
    console.log(req.user, '< - req.user');
    Offer.find({}, function(err, offers) {
        res.render('offers/index', {
            offers
        });
    });
}

function create(req, res) {
    Offer.findById(req.params.id, function(err, db) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        console.log(req.body.user);
        console.log(req.body.userName);

        console.log(db);
        
        //db.offers.push(req.body);
        // db.save(function(err) {
        //     console.log(db);
        //     res.redirect(`pokemon/show`);
        //})
        const offer = Offer(req.body);
        offer.save(function(err) {
            if (err) return res.render('offers/new');
            res.redirect('/offers');
        })
    })
    
}

function newOffer(req, res) {
    res.render('offers/new', {title: "Add Offer"})
}

function show(req, res) {
    Offer.findById(req.params.id, function(err, offer) {
        res.render('offers/show', {title: 'Offer Details', offer})
    })
}