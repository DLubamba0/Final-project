const Team = require("./Team");
const Player = require("./Player");
const Game = require("./Game");
const User = require("./User.js");

Team.hasMany(Player);
Player.belongsTo(Team);

Game.belongsTo(Team, { as: "homeTeam" });
Game.belongsTo(Team, { as: "awayTeam" });

module.exports = {
  Team,
  Player,
  Game,
  User
};