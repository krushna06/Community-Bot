const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const countCommandFiles = (dir) => {
    let count = 0;
    const commandFolders = fs.readdirSync(dir);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join(dir, folder)).filter(file => file.endsWith('.js'));
        count += commandFiles.length;
    }
    return count;
};

router.get('/commands', (req, res) => {
    const commandCount = countCommandFiles(path.join(__dirname, '../../commands'));
    res.json({ totalCommands: commandCount });
});

module.exports = router;
