'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      orderNumber: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      responsiblePerson: {
        type: Sequelize.STRING
      },
      injections: {
        type: Sequelize.INTEGER
      },
      arrived: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW // ?? OR DATE TIME
      },
      vaccine: {
        type: Sequelize.ENUM('Zerpfy','Antiqua','SolarBuddhica')
      },
      healthCareDistrict: {
        type: Sequelize.ENUM('HYKS','KYS','OYS','TAYS','TYKS')
      }
    });

    await queryInterface.createTable('vaccination', {
      vaccination_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      gender: { 
        type: Sequelize.ENUM('male','female','nonbinary'),
      },
      sourceBottle: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: "order",
          key: "id"
        }
      },
      vaccinationDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
  }
};