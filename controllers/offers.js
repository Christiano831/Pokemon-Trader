const Offer = require('../models/offer');
const request = require('request');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/raichu/';


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
    const options = {
        url: `${rootURL}`
    }
    request(options, function(err, body) {
        Offer.find({}, function(err, offers, pokeName) {
            const userData = JSON.parse(body.body);
            const extraURL = offers;
            res.render('offers/index', {
                offers,
                pokeName: userData
            })
        })
    })
}

function create(req, res) {
    Offer.findById(req.params.id, function(err, db) {
        req.body.newRequestURL = 'https://pokeapi.co/api/v2/pokemon/' + req.body.pokemonOffer.toLowerCase();
        const options = {
            url: `${req.body.newRequestURL}`
        }
        request(options, function(err, body) {
            try {
                JSON.parse(body.body);
            } catch (err) {
                return res.redirect('/offers/new');
            }
            const userData = JSON.parse(body.body);
            const userDataNumber = userData.id;
            const userDataString = userDataNumber.toString();
            req.body.pokemonId = userDataString;
            req.body.user = req.user._id;
            const offer = Offer(req.body);
            offer.save(function(err) {
                if (err) return res.render('offers/new');
                res.redirect('/offers');
            })
        })  
    })
}

function newOffer(req, res) {
    res.render('offers/new', {title: "Add Offer"})
}

function show(req, res) {
    Offer.findById(req.params.id, function(err, offer) {
        const options = {
            url: offer.newRequestURL
        }
        request(options, function(err, body) {
            Offer.findById(req.params.id, function(err, offer, pokeSprite) {
                const userData = JSON.parse(body.body);
                res.render('offers/show', {title: 'Offer Details', offer, pokeSprite: userData})
            })
        })
        
    })
}

function deleteOffer(req, res) {
    Offer.findByIdAndDelete(req.params.id, function(err){
        if(err) console.log(err);
    });
    res.redirect('/offers');
}

function edit(req, res) {
    Offer.findById(req.params.id, function(err, offer) {
        res.render('offers/edit', {title: 'Edit Offer', offer})
    })
}

function updateOffer(req, res) {
    Offer.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedOffer){
        res.redirect(`/offers/${req.params.id}`);
    })
}