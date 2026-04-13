const express = require('express');
const router = express.Router();
const { Player, Team } = require('../models');

// GET all
router.get('/', async (req, res) => {
  const players = await Player.findAll({ include: Team });
  res.json(players);
});

// GET one
router.get('/:id', async (req, res) => {
  const player = await Player.findByPk(req.params.id, { include: Team });
  if (!player) return res.status(404).json({ error: 'Not found' });
  res.json(player);
});

// POST
router.post('/', async (req, res) => {
  const player = await Player.create(req.body);
  res.status(201).json(player);
});

// PUT
router.put('/:id', async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (!player) return res.status(404).json({ error: 'Not found' });
  await player.update(req.body);
  res.json(player);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (!player) return res.status(404).json({ error: 'Not found' });
  await player.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
