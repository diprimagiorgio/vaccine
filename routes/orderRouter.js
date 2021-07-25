const express = require('express');
const sequelize = require('sequelize');
const models  = require('../database/models');

const { Op } = require('sequelize')
var moment = require('moment');
const router = express.Router();
router.use(express.json());


//-------------------------------------- Get total of the orded recived
router.get("/total",( req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    models.Order.count()
    .then((nOrders) => {
      if (nOrders)
        res.json({"result": nOrders });
      else
        res.json({"result": 0 });
    }, (err) => next(err))
    .catch((err) => next(err));
  });
  
//-------------------------------------- Get orders recived per producer
  router.get("/totalPerProducer",( req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    models.Order.findAll({
        attributes: [
          'vaccine',
          [sequelize.fn('COUNT', sequelize.col('vaccine')), 'value']
        ],
        group: 'vaccine'
      })
    .then((result) => {
      if (result)
        res.json( result );
    }, (err) => next(err))
    .catch((err) => next(err));
  });
//-------------------------------------- Get number of expired bottles for the given day
var daysbeforeExpiring = 30;
router.get("/expired",( req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  models.Order.count({
      where: {
        arrived: {
          [Op.lt] : moment.utc(req.query.date,moment.ISO_8601).subtract(daysbeforeExpiring, 'days').toDate()
        }
      }
    })
  .then((result) => {
    if (result)
      res.json( {"result": result} );
  }, (err) => next(err))
  .catch((err) => next(err));
});
module.exports = router;
