const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_token_access: {
    type: DataTypes.STRING,
  },
  user_account_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = User;
