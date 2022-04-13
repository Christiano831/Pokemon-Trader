// const e = require('express');
// const { update } = require('../models/offer');
const Offer = require('../models/offer');


module.exports = {
    index,
    create,
    new: newOffer,
    show,
    delete: deleteOffer,
    edit,
    update: updateOffer
}

function index(req, res) {
    // console.log(req.user, '< - req.user');
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
        // console.log(req.body.user);
        // console.log(req.body.userName);

        // console.log(db);
        
        //db.offers.push(req.body);
        // db.save(function(err) {
        //     console.log(db);
        //     res.redirect(`pokemon/show`);
        //})
        const obj = JSON.parse(JSON.stringify(req.body));
        
        const offer = Offer(req.body);
        offer.save(function(err) {
            if (err) return res.render('offers/new');
            res.redirect('/offers');
        })
        console.log(req.body, '<-------- req.body');
        console.log(obj, 'stringyfieeeedddddd')
    })
    
}

function newOffer(req, res) {
    res.render('offers/new', {title: "Add Offer"})
}

function show(req, res) {
    console.log(req.body, '<-------- req.body');
    console.log(req.params, '<-------- req.params');

    Offer.findById(req.params.id, function(err, offer) {
        res.render('offers/show', {title: 'Offer Details', offer})
        console.log(offer, '<- offer')
    })
}

function deleteOffer(req, res) {
    Offer.findByIdAndDelete(req.params.id, function(err){
        if(err) console.log(err);
        console.log('succesful delete');
    });
    
    console.log(req.params.id);
    res.redirect('/offers');
}

function edit(req, res) {
    // Offer.findOne({_id: req.params.id, userRecommending: req.user._id}, function(err, offer) {
    //     if (err || !offer) return res.redirect('/offers');
    //     res.render('offers/edit', {offer});
    //   });

    console.log(req.params, '<-------- req.params');
    Offer.findOne(req.params.id, function(err, offer) {
        res.render('offers/edit', {title: 'Edit Offer', offer})
        
    })
    
    // console.log(req.params.id);
    // Offer.findById(req.params.id, function(err, offer) {
    //     res.render('offers/edit', {title: 'Offer Details', offer})
    // })
}

function updateOffer(req, res) {
    console.log(req.body, '<-------- req.body');
    Offer.findByIdAndUpdate(req.params.id, Offer(req.body))
    Offer.save();
    res.redirect('/offers');
    // const doc = Offer.findOne()
}