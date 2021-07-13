'use strict';

const path = require('path');
const lineByLine = require('n-readlines');

// I want to read the file line by line wothout reading the whole file into memory which might overload the system
// TODO Find a way to do it faster
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let liner, line;
    //------------------------------------------------- for bootle --------------------------------------------------//
    liner = new lineByLine(path.join(__dirname, 'resources','Antiqua.source'));
    while (line = liner.next()) {
      await queryInterface.bulkInsert('bottle',[JSON.parse(line.toString())]);
    }

    liner = new lineByLine(path.join(__dirname, 'resources','SolarBuddhica.source'));
    while (line = liner.next()) {
      await queryInterface.bulkInsert('bottle',[JSON.parse(line.toString())]);
    }

    liner = new lineByLine(path.join(__dirname, 'resources','Zerpfy.source'));
    while (line = liner.next()) {
      await queryInterface.bulkInsert('bottle',[JSON.parse(line.toString())]);
    }
    
    //----------------------------------------------- for vaccination -----------------------------------------------//
    liner = new lineByLine(path.join(__dirname, 'resources','vaccinations.source'));
    while (line = liner.next()) {
      await queryInterface.bulkInsert('vaccination',[JSON.parse(line.toString().replace('-','_'))]);
    }
    
  
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('vaccination', null, {});
     await queryInterface.bulkDelete('bottle', null, {});
  }
};
