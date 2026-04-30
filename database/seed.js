require("dotenv").config();
const bcrypt = require("bcrypt");
const sequelize = require("./index");
const { User, Team, Player, Game } = require("../models");

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    const adminPassword = await bcrypt.hash("admin123", 10);
    const playerPassword = await bcrypt.hash("player123", 10);

    await User.create({
      username: "adminuser",
      email: "admin@example.com",
      password: adminPassword,
      role: "admin"
    });

    await User.create({
      username: "playeruser",
      email: "player@example.com",
      password: playerPassword,
      role: "player"
    });

    const team1 = await Team.create({
      name: "Charlotte Hornets",
      city: "Charlotte",
      coach: "Coach Davis"
    });

    const team2 = await Team.create({
      name: "Atlanta Hawks",
      city: "Atlanta",
      coach: "Coach Smith"
    });

    const team3 = await Team.create({
      name: "Miami Heat",
      city: "Miami",
      coach: "Coach Johnson"
    });

    await Player.bulkCreate([
      {
        name: "Marcus Brown",
        position: "Point Guard",
        jerseyNumber: 3,
        TeamId: team1.id
      },
      {
        name: "Jaylen Carter",
        position: "Shooting Guard",
        jerseyNumber: 12,
        TeamId: team1.id
      },
      {
        name: "Andre Wilson",
        position: "Small Forward",
        jerseyNumber: 22,
        TeamId: team2.id
      },
      {
        name: "Chris Thompson",
        position: "Center",
        jerseyNumber: 34,
        TeamId: team3.id
      }
    ]);

    await Game.bulkCreate([
      {
        date: "2026-05-01",
        location: "Charlotte Arena",
        homeTeamId: team1.id,
        awayTeamId: team2.id,
        homeScore: 98,
        awayScore: 91
      },
      {
        date: "2026-05-08",
        location: "Miami Court",
        homeTeamId: team3.id,
        awayTeamId: team1.id,
        homeScore: 105,
        awayScore: 100
      }
    ]);

    console.log("Database seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();