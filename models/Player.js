const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Player = sequelize.define('Player', {
  name: { type: DataTypes.STRING, allowNull: false },
  position: DataTypes.STRING
});

module.exports = Player;
