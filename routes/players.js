const express = require("express");
const { Player, Team } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const players = await Player.findAll({
      include: Team
    });

    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id, {
      include: Team
    });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { name, position, TeamId } = req.body;

      if (!name || !position || !TeamId) {
        return res.status(400).json({
          message: "Name, position, and TeamId are required"
        });
      }

      const player = await Player.create({
        name,
        position,
        TeamId
      });

      res.status(201).json(player);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const player = await Player.findByPk(req.params.id);

      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      await player.update(req.body);
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const player = await Player.findByPk(req.params.id);

      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      await player.destroy();
      res.json({ message: "Player deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;