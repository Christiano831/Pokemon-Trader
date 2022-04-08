var express = require('express');
var router = express.Router();
//const request = require('request');

const token = process.env.

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pokemon Trader Hub' });
});

module.exports = router;
