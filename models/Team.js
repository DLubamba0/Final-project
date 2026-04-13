const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Team = sequelize.define('Team', {
  name: { type: DataTypes.STRING, allowNull: false },
  city: DataTypes.STRING
});

module.exports = Team;
