'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    id:  { type: DataTypes.STRING, primaryKey: true},
    orderNumber: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false },
    responsiblePerson: DataTypes.STRING,
    injections: DataTypes.INTEGER,
    arrived: { type: DataTypes.DATE },
    vaccine: DataTypes.ENUM('Zerpfy','Antiqua','SolarBuddhica'),
    healthCareDistrict: DataTypes.ENUM('HYKS','KYS','OYS','TAYS','TYKS'),
    injections_used: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
  });
  return Order;
};