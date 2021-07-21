const express = require('express');
const sequelize = require('sequelize');
const models  = require('../database/models');

const { Op } = require('sequelize')
var moment = require('moment');
const router = express.Router();
router.use(express.json());

//-------------------------------------- Get total of the doses recived
//router.get("/totalDoses", cors.corsWithOptions,( req, res, next) => {
    router.get("/total",( req, res, next) => {
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
//-------------------------------------- Get doses recived per producer
router.get("/totalPerProducer",( req, res, next) => {
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
//-------------------------------------- Get number of expired bottles for the given day
var daysbeforeExpiring = 30;

router.get("/expired",( req, res, next) => {

    // check the input
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    models.Order.sum('injections_used', {
        where: {
          arrived: {
            [Op.lte] : moment(req.query.date).subtract(daysbeforeExpiring, 'days').toDate()
          }
        }
      })
    .then((injections_used) => {
      if (!injections_used)
        injections_used = 0;
      models.Order.sum('injections', {
        where: {
          arrived: {
            [Op.lte] : moment(req.query.date).subtract(daysbeforeExpiring, 'days').toDate()
          }
        }
      }, (err) => next(err))
      .then((injections) => {
        if(!injections)
          injections = 0;
        res.json( {"result": injections - injections_used} );
    }, (err) => next(err))
    .catch((err) => next(err));
    });
  });
//-------------------------------------- Get number of vaccine available for the given day
router.get("/available",( req, res, next) => {
    // check the input
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    models.Order.sum('injections_used', {
        where: {
          arrived: {
            [Op.gt] : moment(req.query.date).subtract(daysbeforeExpiring, 'days').toDate()
          }
        }
      })
    .then((injections_used) => {
      if (!injections_used)
        injections_used = 0;
      models.Order.sum('injections', {
        where: {
          arrived: {
            [Op.gt] : moment(req.query.date).subtract(daysbeforeExpiring, 'days').toDate()
          }
        }
      }, (err) => next(err))
      .then((injections) => {
        if(!injections)
          injections = 0;
        res.json( {"result": injections - injections_used} );
    }, (err) => next(err))
    .catch((err) => next(err));
    });
  });


module.exports = router;