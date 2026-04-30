const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Game = sequelize.define("Game", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  homeScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  awayScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Game;