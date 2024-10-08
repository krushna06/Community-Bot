const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.use(cors());

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

const getTotalCommands = (dir) => {
  let totalCount = 0;
  const commandFolders = fs.readdirSync(dir);
  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(dir, folder)).filter(file => file.endsWith('.js'));
    totalCount += commandFiles.length;
  }
  return totalCount;
};

const getTotalServers = (client) => {
  return client.guilds.cache.size;
};

router.get('/stats', (req, res) => {
  const totalCommands = getTotalCommands(path.join(__dirname, '../../commands'));
  const totalServers = getTotalServers(req.app.locals.client);
  res.json({ totalCommands, totalServers });
});

module.exports = router;
