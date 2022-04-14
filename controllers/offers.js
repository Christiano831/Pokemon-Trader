// const e = require('express');
// const { update } = require('../models/offer');
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
    // const extraURL = [];
    // Offer.find({}, function(err, offers, extraURL){
    //     console.log(offers, '<--------------------------------------offers');
    //     extraURL = offers[0].pokemonOffer
    // });
    // console.log(extraURL, '<--------------------------------------ExtraURL');
    const options = {
        url: `${rootURL}`
    }
    // console.log(options, '<--------------------------------------options');
    // console.log(options, '< - options');
    request(options, function(err, body) {
        // console.log(body.body, '<----------------pokebody')
        
        // console.log(userData, '-------------------userData');
        Offer.find({}, function(err, offers, pokeName) {
            const userData = JSON.parse(body.body);
            const extraURL = offers;
            // console.log(extraURL, '<--------------------------------------ExtraURL');

            // console.log(offers.baseURL), '<---------------------------offers')
            res.render('offers/index', {
                offers,
                pokeName: userData
            })
            
        })
    })
}

function create(req, res) {
    Offer.findById(req.params.id, function(err, db) {
        req.body.user = req.user._id;
        const obj = JSON.parse(JSON.stringify(req.body));
        
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