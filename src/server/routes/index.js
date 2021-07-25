var express = require('express');
const models  = require('../database/models');

var router = express.Router();
// TODO avoid more reservation than doses for the same bottle


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
