const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Ingredient = sequelize.define("Ingredient", {
  id_ingredient: {
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
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Ingredient;
