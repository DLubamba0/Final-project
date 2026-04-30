require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const logger = require("./middleware/logger");

const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/teams");
const playerRoutes = require("./routes/players");
const gameRoutes = require("./routes/games");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    message: "Basketball Tournament Management API is running."
  });
});

app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);
app.use("/players", playerRoutes);
app.use("/games", gameRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;

  sequelize.sync().then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;