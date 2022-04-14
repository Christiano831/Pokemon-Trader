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
    
    const options = {
        url: `${rootURL}`
    }
    // console.log(options, '< - options');
    request(options, function(err, body) {
        // console.log(body.body, '<----------------pokebody')
        const userData = JSON.parse(body.body);
        // console.log(userData, '-------------------userData');
        // return userData
        Offer.find({}, function(err, offers, pokeName) {
            res.render('offers/index', {
                offers,
                pokeName: userData
            })
            //console.log(userData);
        })
        
        
        //console.log(userData.sprites.other['official-artwork'].front_default)
        // res.render('offers/index', { 
        //   title: 'Pokemon Trader Hub',
        //   pokeName: userData
        // });
    
    })
    // console.log(baseURL);
    // Offer.find({}, function(err, offers) {
    //     res.render('offers/index', {
    //         offers,
    //         pokeName: baseURL
            // pokeName: request(options, function(err, response, body) {
            //     const userData = JSON.parse(body);
            //     return userData
            // })
        // });
        // console.log(offers);
        // console.log(pokeName);
    // });
}

function create(req, res) {
    // console.log(req.body, '<-------- req.body');
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
        // console.log(req.body, '<-------- req.body');
        // console.log(obj, 'stringyfieeeedddddd')
    })
    
}

function newOffer(req, res) {
    res.render('offers/new', {title: "Add Offer"})
}

function show(req, res) {
    //console.log(req.body, '<-------- req.body');
    //console.log(req.params, '<-------- req.params');

    Offer.findById(req.params.id, function(err, offer) {
        res.render('offers/show', {title: 'Offer Details', offer})
        // console.log(offer, '<- offer in the show cntrl')

    })
}

function deleteOffer(req, res) {
    Offer.findByIdAndDelete(req.params.id, function(err){
        if(err) console.log(err);
        // console.log('succesful delete');
    });
    
    // console.log(req.params.id);
    res.redirect('/offers');
}

function edit(req, res) {
    Offer.findById(req.params.id, function(err, offer) {
        res.render('offers/edit', {title: 'Edit Offer', offer})
        // console.log(offer, '<- offer')
    })
}

function updateOffer(req, res) {
    // console.log(req.body, '<-------- req.body');
    Offer.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedOffer){
        // console.log(updatedOffer);
        res.redirect(`/offers/${req.params.id}`);
    })
    // const doc = Offer.findOne()
}