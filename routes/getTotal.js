const express = require('express');
const models  = require('../database/models');

const sequelize = require('sequelize');
const { Op } = require('sequelize')
var moment = require('moment');
const router = express.Router();
router.use(express.json());
//-------------------------------------- Get total of the doses recived
//router.get("/totalDoses", cors.corsWithOptions,( req, res, next) => {
router.get("/totalDoses",( req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    models.Order.sum('injections')
    .then((nInjections) => {
      if (nInjections)
        res.json({"result": nInjections });
      else
      res.json({"result": 0 });
    }, (err) => next(err))
    .catch((err) => next(err));
  });
//-------------------------------------- Get total of the orded recived
router.get("/totalOrders",( req, res, next) => {
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
//-------------------------------------- Get total of vaccinations used
router.get("/totalVaccine",( req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    models.Vaccination.count()
    .then((nVaccinations) => {
      if (nVaccinations)
        res.json({"result": nVaccinations });
      else
      res.json({"result": 0 });
    }, (err) => next(err))
    .catch((err) => next(err));
  });
//-------------------------------------- Get doses recived per producer
  router.get("/totalDosesPerProducer",( req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    models.Order.findAll({
        attributes: [
          'vaccine',
          [sequelize.fn('SUM', sequelize.col('injections')), 'value']
        ],
        group: 'vaccine'
      })
    .then((result) => {
      if (result)
        res.json( result );
    }, (err) => next(err))
    .catch((err) => next(err));
  });
//-------------------------------------- Get orders recived per producer
  router.get("/totalOrdersPerProducer",( req, res, next) => {
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
//-------------------------------------- Get number of expired bottles
var daysbeforeExpiring = 30;
router.get("/bottlesExpired",( req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  models.Order.count({
      where: {
        arrived: {
          [Op.lte] : moment().subtract(daysbeforeExpiring, 'days').toDate()
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
