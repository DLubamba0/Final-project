const express = require("express");
const { Team } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Public: get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public: get one team
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin only: create team
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { name, city } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Team name is required" });
      }

      const team = await Team.create({ name, city });
      res.status(201).json(team);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Admin only: update team
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const team = await Team.findByPk(req.params.id);

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      await team.update(req.body);
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Admin only: delete team
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const team = await Team.findByPk(req.params.id);

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      await team.destroy();
      res.json({ message: "Team deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;