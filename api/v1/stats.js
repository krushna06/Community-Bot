const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const getCommandDetails = (dir) => {
    const commandDetails = [];
    const commandFolders = fs.readdirSync(dir);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join(dir, folder)).filter(file => file.endsWith('.js'));
        const commands = commandFiles.map(file => path.basename(file, '.js'));
        if (commands.length > 0) {
            commandDetails.push({
                category: folder,
                commands: commands,
            });
        }
    }
    return commandDetails;
};

router.get('/commands', (req, res) => {
    const commandDetails = getCommandDetails(path.join(__dirname, '../../commands'));
    res.json({ commandDetails });
});

module.exports = router;
