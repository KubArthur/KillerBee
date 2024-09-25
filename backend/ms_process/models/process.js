const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Process = sequelize.define("Process", {
  id_process: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  steps_and_descriptions_of_validation_tests: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Process;
