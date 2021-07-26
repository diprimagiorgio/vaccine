var express = require('express');
const models  = require('../database/models');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index', { title: 'Express' });
});


module.exports = router;
