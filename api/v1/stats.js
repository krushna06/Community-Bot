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

const getCommandDetails = (dir) => {
  let totalCount = 0;
  const commandDetails = [];
  const commandFolders = fs.readdirSync(dir);

  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(dir, folder)).filter(file => file.endsWith('.js'));
    const commands = commandFiles.map(file => path.basename(file, '.js'));
    totalCount += commands.length;

    if (commands.length > 0) {
      commandDetails.push({
        category: folder,
        commands: commands,
      });
    }
  }
  return { totalCount, commandDetails };
};

router.get('/commands', (req, res) => {
  const { totalCount, commandDetails } = getCommandDetails(path.join(__dirname, '../../commands'));
  res.json({ totalCount, commandDetails });
});

module.exports = router;
