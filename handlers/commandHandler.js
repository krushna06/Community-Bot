const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    client.commands = new Map();
    
    const commandFolders = fs.readdirSync(path.join(__dirname, '../commands'));
    
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/${folder}`)).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.data.name, command);
        }
    }
};
