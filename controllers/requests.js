const Request = require('../models/request');
const request = require('request');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pichu/';


module.exports = {
    index,
    create,
    new: newRequest,
    show,
    delete: deleteRequest,
    edit,
    update: updateRequest
}

function index(req, res) {
    const options = {
        url: `${rootURL}`
    }
    request(options, function(err, body) {
        Request.find({}, function(err, requests, pokeName) {
            const userData = JSON.parse(body.body);
            const extraURL = requests;
            res.render('requests/index', {
                requests,
                pokeName: userData
            });
        });
    })
}

function create(req, res) {
    Request.findById(req.params.id, function(err, db) {
        req.body.user = req.user._id;
        const requesting = Request(req.body);
        requesting.save(function(err) {
            if (err) return res.render('requests/new');
            res.redirect('/requests');
        })
    }) 
}

function newRequest(req, res) {
    res.render('requests/new', {title: "Add Request"})
}

function show(req, res) {
    Request.findById(req.params.id, function(err, request) {
        res.render('requests/show', {title: 'Request Details', request})
    })
}

function deleteRequest(req, res) {
    Request.findByIdAndDelete(req.params.id, function(err){
        if(err) console.log(err);
    });
    res.redirect('/requests');
}

function edit(req, res) {
    Request.findById(req.params.id, function(err, request) {
        res.render('requests/edit', {title: 'Edit Request', request})
    })
}

function updateRequest(req, res) {
    console.log(req.body, '<-------- req.body');
    Request.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedRequest){
        res.redirect(`/requests/${req.params.id}`);
    })
}