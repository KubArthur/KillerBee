const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Modele = sequelize.define("Modele", {
  id_modele: {
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
  unit_price_excluding_tax: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  range: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weights: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Modele;
