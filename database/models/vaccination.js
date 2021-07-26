'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vaccination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.channelId = this.belongsTo(models.Order, {
        foreignKey: 'id',
        onDelete: 'CASCADE'
      });
    }
  };
  Vaccination.init({
    vaccination_id: { type: DataTypes.STRING },
      gender: { type: DataTypes.ENUM('male','female','nonbinary')},
      sourceBottle: {
        type: DataTypes.STRING,
        references:{
          model: "Orders",
          key: "id",
          onDelete: 'CASCADE',
        }
      },
      vaccinationDate: {
        type: DataTypes.DATE
      }
  }, {
    sequelize,
  });
  return Vaccination;
};