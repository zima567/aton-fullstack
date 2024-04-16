'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "fioResponsable" });
    }
  }
  Client.init({
    accountNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    inn: {
      type: DataTypes.STRING,
      unique: true
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};