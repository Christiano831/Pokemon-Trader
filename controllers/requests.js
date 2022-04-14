const Request = require('../models/request');


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
    // console.log(req.user, '< - req.user');
    Request.find({}, function(err, requests) {
        res.render('requests/index', {
            requests
        });
    });
}

function create(req, res) {
    Request.findById(req.params.id, function(err, db) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        // console.log(req.body.user);
        // console.log(req.body.userName);

        // console.log(db);
        
        //db.requests.push(req.body);
        // db.save(function(err) {
        //     console.log(db);
        //     res.redirect(`pokemon/show`);
        //})
        const request = Request(req.body);
        request.save(function(err) {
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
        // console.log('succesful delete');
    });
    
    // console.log(req.params.id);
    res.redirect('/requests');
}

function edit(req, res) {
    Request.findById(req.params.id, function(err, request) {
        res.render('requests/edit', {title: 'Edit Request', request})
        // console.log(request, '<- request')
    })
}

function updateRequest(req, res) {
    console.log(req.body, '<-------- req.body');
    Request.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedRequest){
        // console.log(updatedRequest);
        res.redirect(`/requests/${req.params.id}`);
    })
    // const doc = Request.findOne()
}