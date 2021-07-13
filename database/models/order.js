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
    id:  { type: Sequelize.STRING, primaryKey: true},
    orderNumber: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false },
    responsiblePerson: sequelize.STRING,
    injections: integer,
    arrived: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW },// ?? OR DATE TIME
    vaccine: DataTypes.ENUM('Zerpfy','Antiqua','SolarBuddhica'),
    healthCareDistrict: DataTypes.ENUM('HYKS','KYS','OYS','TAYS','TYKS')
  }, {
    sequelize,
    //modelName: 'Order',
  });
  return Order;
};