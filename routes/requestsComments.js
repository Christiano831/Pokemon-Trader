var router = require('express').Router();
const passport = require('passport');
const request = require('request');
const axios = require('axios');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pikachu/';
const requestsCommentsCtrl = require('../controllers/requestsComments');


router.delete('/:id', requestsCommentsCtrl.delete);
router.post('/offers/:id/comments', requestsCommentsCtrl.create);
router.get('/:id/edit', requestsCommentsCtrl.edit);
router.put('/:id', requestsCommentsCtrl.update);


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;