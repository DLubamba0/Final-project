const express = require("express");
const router = express.Router();
const { Team } = require("../models");

// GET all
router.get("/", async (req, res) => {
  const teams = await Team.findAll();
  res.json(teams);
});

// GET one
router.get("/:id", async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: "Not found" });
  res.json(team);
});

// POST
router.post("/", async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

// PUT
router.put("/:id", async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: "Not found" });

  await team.update(req.body);
  res.json(team);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: "Not found" });

  await team.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;