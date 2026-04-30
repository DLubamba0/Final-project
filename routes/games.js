const express = require("express");
const { Game, Team } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const games = await Game.findAll({
      include: [
        { model: Team, as: "homeTeam" },
        { model: Team, as: "awayTeam" }
      ]
    });

    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id, {
      include: [
        { model: Team, as: "homeTeam" },
        { model: Team, as: "awayTeam" }
      ]
    });

    if (!game) {
      return res.status(404).json({ error: "Game not found." });
    }

    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const { date, location, homeTeamId, awayTeamId, homeScore, awayScore } = req.body;

    if (!date || !location || !homeTeamId || !awayTeamId) {
      return res.status(400).json({
        error: "Date, location, homeTeamId, and awayTeamId are required."
      });
    }

    const homeTeam = await Team.findByPk(homeTeamId);
    const awayTeam = await Team.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ error: "One or both teams were not found." });
    }

    const game = await Game.create({
      date,
      location,
      homeTeamId,
      awayTeamId,
      homeScore,
      awayScore
    });

    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);

    if (!game) {
      return res.status(404).json({ error: "Game not found." });
    }

    await game.update(req.body);
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);

    if (!game) {
      return res.status(404).json({ error: "Game not found." });
    }

    await game.destroy();
    res.json({ message: "Game deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;