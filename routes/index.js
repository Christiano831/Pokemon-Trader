var router = require('express').Router();
// var router = express.Router();
const passport = require('passport');
const request = require('request');
const axios = require('axios');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pikachu/';
//const request = require('../server');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query, '<- req.query')
  const options = {
    url: `${rootURL}`
  }
  request(options, function(err, response, body) {
    const userData = JSON.parse(body);
    console.log(userData.sprites.other['official-artwork'].front_default)
    res.render('index', { 
      title: 'Pokemon Trader Hub',
      pokeName: userData
    });

  })
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/', // where do you want the client to go after you login 
    failureRedirect : '/' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;