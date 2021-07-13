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
      // define association here
      this.channelId = this.belongsTo(models.Bottle, {
        foreignKey: 'id',
        onDelete: 'CASCADE'
      });
    }
  };
  Vaccination.init({
    vaccination_id: { type: Sequelize.STRING },
      gender: { type: DataTypes.ENUM('male','female','nonbinary')},
      sourceBottle: {
        type: Sequelize.STRING,
        references:{
          model: "bottle",
          key: "id",
          onDelete: 'CASCADE',
        }
      },
      vaccinationDate: {
        type: Sequelize.DATEONLY
      }
  }, {
    sequelize,
    //modelName: 'vaccination',
  });
  return Vaccination;
};