const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Modele = require("./modele");

const Cook = sequelize.define("Cook", {
  id_modele: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Modele,
      key: "id_modele",
    },
  },
  id_ingredient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

module.exports = Cook;
