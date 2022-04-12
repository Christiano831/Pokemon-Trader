var router = require('express').Router();
const passport = require('passport');
const request = require('request');
const axios = require('axios');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pikachu/';
const offersCtrl = require('../controllers/offers');

//router.put('/:id', offersCtrl.edit);
router.delete('/:id', offersCtrl.delete);
router.get('/new', offersCtrl.new);
router.post('/', offersCtrl.create);
router.get('/index', offersCtrl.index);
router.get('/:id', offersCtrl.show);


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;