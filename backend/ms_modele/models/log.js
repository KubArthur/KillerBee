const { DataTypes } = require("sequelize");
const sequelize = require("../../ms_ingredient/config/db");

const Log = sequelize.define("Log", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Log;
