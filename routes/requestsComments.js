var router = require('express').Router();
const passport = require('passport');
const request = require('request');
const axios = require('axios');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pikachu/';
const requestsCommentsCtrl = require('../controllers/requestsComments');


router.delete('/requestComments/:id', requestsCommentsCtrl.delete);
router.post('/requests/:id/requestsComments', requestsCommentsCtrl.create);
router.get('/:id/edit', requestsCommentsCtrl.edit);
router.put('/requestComments/:id', requestsCommentsCtrl.update);


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;