const express = require("express");
require('dotenv').config();
const app = express();
const sequelize = require("./database");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const teamRoutes = require("./routes/teams");
const playerRoutes = require("./routes/players");
const gameRoutes = require("./routes/games");

app.use(express.json());
app.use(logger);

// test route
app.get("/", (req, res) => {
  res.send("Basketball API Running");
});

app.use("/teams", teamRoutes);
app.use("/players", playerRoutes);
app.use("/games", gameRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;