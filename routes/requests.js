var router = require('express').Router();
const passport = require('passport');
const request = require('request');
const axios = require('axios');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pikachu/';
const requestsCtrl = require('../controllers/requests');


router.get('/index', requestsCtrl.index);

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;