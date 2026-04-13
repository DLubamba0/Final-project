const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Game = sequelize.define('Game', {
  date: DataTypes.DATE,
  location: DataTypes.STRING
});

module.exports = Game;
