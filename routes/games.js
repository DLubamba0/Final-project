const express = require('express');
const router = express.Router();
const { Game, Team } = require('../models');

// GET all
router.get('/', async (req, res) => {
  const games = await Game.findAll({ include: [{ model: Team, as: 'homeTeam' }, { model: Team, as: 'awayTeam' }] });
  res.json(games);
});

// GET one
router.get('/:id', async (req, res) => {
  const game = await Game.findByPk(req.params.id, { include: [{ model: Team, as: 'homeTeam' }, { model: Team, as: 'awayTeam' }] });
  if (!game) return res.status(404).json({ error: 'Not found' });
  res.json(game);
});

// POST
router.post('/', async (req, res) => {
  const game = await Game.create(req.body);
  res.status(201).json(game);
});

// PUT
router.put('/:id', async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (!game) return res.status(404).json({ error: 'Not found' });
  await game.update(req.body);
  res.json(game);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (!game) return res.status(404).json({ error: 'Not found' });
  await game.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
