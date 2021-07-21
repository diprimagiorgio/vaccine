var express = require('express');
const models  = require('../database/models');

var router = express.Router();
// TODO avoid more reservation than doses for the same bottle


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.route('/test')
.get(( req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  res.json('{"name":"vaccine" }');
});
// insert a vaccination we have to use a transaction
router.post("/order",( req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  models.Order.create(req.body)
  .then((order) => {
        console.log("Order created", order);
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
});


// get doses recived per producer
// get orders recived per producer
module.exports = router;
