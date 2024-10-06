const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Log = sequelize.define("Log", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Log;
