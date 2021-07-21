const express = require('express');
const models  = require('../database/models');

const sequelize = require('sequelize');
const { Op } = require('sequelize')
var moment = require('moment');
const router = express.Router();
router.use(express.json());

//-------------------------------------- Get total of vaccinations used
router.get("/total",( req, res, next) => {
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


module.exports = router;
