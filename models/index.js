const Team = require("./Team");
const Player = require("./Player");
const Game = require("./Game");

// Relationships
Team.hasMany(Player);
Player.belongsTo(Team);

// Game relationships
Game.belongsTo(Team, { as: "homeTeam" });
Game.belongsTo(Team, { as: "awayTeam" });

module.exports = { Team, Player, Game };