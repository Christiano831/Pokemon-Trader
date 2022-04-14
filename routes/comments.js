var router = require('express').Router();
const passport = require('passport');
const request = require('request');
const axios = require('axios');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pikachu/';
const commentsCtrl = require('../controllers/comments');


router.delete('/comments/:id', commentsCtrl.delete);
router.post('/offers/:id/comments', commentsCtrl.create);
router.get('/:id/edit', commentsCtrl.edit);
router.put('/comments/:id', commentsCtrl.update)


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;