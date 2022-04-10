var router = require('express').Router();
const passport = require('passport');
const request = require('request');
const axios = require('axios');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pikachu/';
const offersCtrl = require('../controllers/offers');

//router.get('/', offersCtrl.create);
router.get('/index', offersCtrl.index);

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;