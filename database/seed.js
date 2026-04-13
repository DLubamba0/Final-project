const { Team, Player, Game } = require("../models");
const sequelize = require("./index");

async function seed() {
  await sequelize.sync({ force: true });

  const team1 = await Team.create({ name: "Lakers", city: "LA" });
  const team2 = await Team.create({ name: "Bulls", city: "Chicago" });

  await Player.create({ name: "LeBron", position: "SF", TeamId: team1.id });
  await Player.create({ name: "Jordan", position: "SG", TeamId: team2.id });

  await Game.create({
    date: new Date(),
    location: "Arena",
    homeTeamId: team1.id,
    awayTeamId: team2.id
  });

  console.log("Seeded!");
}

seed();