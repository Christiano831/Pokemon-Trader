var router = require('express').Router();
const passport = require('passport');
const request = require('request');
const rootURL = 'https://pokeapi.co/api/v2/pokemon/pikachu/';


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query, '<- req.query')
  const options = {
    url: `${rootURL}`
  }
  request(options, function(err, response, body) {
    const userData = JSON.parse(body);
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
    successRedirect : '/',
    failureRedirect : '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;