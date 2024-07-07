const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('./config/config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load events
const loadEvents = (dir) => {
    const eventFiles = fs.readdirSync(path.join(__dirname, dir)).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(path.join(__dirname, dir, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};

loadEvents('./events/client');
loadEvents('./events/guild');

// Load commands
client.commands = new Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

client.login(token);
