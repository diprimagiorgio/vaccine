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
async function expired(next, date){ 
  return new Promise(( resolve) => {
    date = moment.utc(date,moment.ISO_8601).subtract(daysbeforeExpiring, 'days');
    models.Order.sum('injections_used', {
      where: {
        arrived: {
          [Op.lt] : date
        }
      }
    })
    .then((injections_used) => {
      if (!injections_used)
        injections_used = 0;
      models.Order.sum('injections', {
        where: {
          arrived: {
            [Op.lt] : date
          }
        }
      })
      .then((injections) => {
        if(!injections)
          injections = 0;
        resolve(injections - injections_used);
      }, (err) => next(err))
      .catch((err) => next(err));
    }).catch((err) => next(err));
  });
}
router.get("/expired",( req, res, next) => {

    // check the input
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    expired(next, req.query.date)
    .then((result) =>{
      res.json( {"result": result} );
    },(err) => next(err)).catch((err) => next(err));

    
  });
//-------------------------------------- Get number of vaccine available for the given day
router.get("/available",( req, res, next) => {
    // check the input
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    models.Order.sum('injections_used', {
        where: {
          arrived: {
            [Op.gte] : moment.utc(req.query.date,moment.ISO_8601).subtract(daysbeforeExpiring, 'days')
          }
        }
      })
    .then((injections_used) => {
      if (!injections_used)
        injections_used = 0;
      models.Order.sum('injections', {
        where: {
          arrived: {
            [Op.gte] : moment.utc(req.query.date,moment.ISO_8601).subtract(daysbeforeExpiring, 'days')
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
//-------------------------------------- Get number of vaccines are going to expire in the next 10, from the given day
async function expiredBetween(next, first_date, last_date){
  return new Promise(( resolve) => {
    expired(next, first_date)
    .then( result => {
      let doses_expired = result;
      expired(next, last_date )
      .then( result => {
        resolve(result - doses_expired);
      }, (err) => next(err));
    },(err) => next(err))
    .catch((err) => next(err));
  });
}

router.get("/expired10days",( req, res, next) => {
    // check the input
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let last_date = moment.utc(req.query.date ,moment.ISO_8601).add(10, 'days');
    expiredBetween(next, req.query.date, last_date)
    .then( result => res.json({"result": result}) ,(err) => next(err) )
    .catch((err) => next(err) );
  });
//------------------------------------- Get number of vaccine are going to expire in the next 10 days, splitted per day and producer
// find number of doses expired in one day between date+i day and the previuose one 
function expired1Day(next, date, i) {
  return new Promise((resolve) => {
    let first_day = moment.utc(date, moment.ISO_8601).add(i -1, 'days');
    let last_day = moment.utc(date, moment.ISO_8601).add(i, 'days');
    expiredBetween(next, first_day, last_day)
    .then( result => {
      jsonObj = {};
      jsonObj["date"] = last_day;
      jsonObj["value"] = result;
      resolve(jsonObj);
    },(err) => next(err) )
    .catch((err) => next(err) )
  });
}

router.get("/expired10dayssplitted",( req, res, next) => {
  // check the input
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const promises = [];
    
    for (let i = 0; i < 10; ++i) {
        promises.push(expired1Day(next, req.query.date, i));
    }
    
    Promise.all(promises)
        .then((results) => {
            console.log("All done", results);
            res.json({"result" : results})
        })
        .catch((err) => next(err) );


  
});
module.exports = router;