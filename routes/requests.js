var router = require('express').Router();
const passport = require('passport');
const request = require('request');
const axios = require('axios');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pikachu/';
const requestsCtrl = require('../controllers/requests');


router.delete('/:id', requestsCtrl.delete);
router.get('/new', requestsCtrl.new);
router.post('/', requestsCtrl.create);
router.get('/', requestsCtrl.index);
router.get('/:id', requestsCtrl.show);
router.get('/:id/edit', requestsCtrl.edit);
router.put('/:id', requestsCtrl.update)


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;